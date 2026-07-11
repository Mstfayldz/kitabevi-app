import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookCard from '../components/BookCard'; 
import { categories } from '../interfaces/BookSchema'; 

export default function Home() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  
  const [cartCount, setCartCount] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [books, setBooks] = useState([]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tümü');

  useEffect(() => {
    // 1. Otomatik Temizlik (Bozuk ikonları ve eski verileri son kez sıfırlar)
    if (!localStorage.getItem('v7_cleaned')) {
      localStorage.clear();
      localStorage.setItem('v7_cleaned', 'true');
      navigate('/');
      return;
    }

    // 2. Oturum Kontrolü
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
      navigate('/');
      return;
    }
    setCurrentUser(user);

    // 3. 16 Kitaplık Tam Veri Seti (Sadece kapalı şık kitap ikonları, hatasız!)
    let globalBooks = JSON.parse(localStorage.getItem('books')) || [];
    if (globalBooks.length === 0) {
      globalBooks = [
        { id: 1, title: "1984", author: "George Orwell", year: 1949, category: "Bilim Kurgu", price: "120 TL", image: "📘", trending: true, owner: "admin" },
        { id: 2, title: "Dune", author: "Frank Herbert", year: 1965, category: "Fantastik", price: "200 TL", image: "📙", trending: true, owner: "admin" },
        { id: 3, title: "Suç ve Ceza", author: "Dostoyevski", year: 1866, category: "Roman", price: "150 TL", image: "📕", trending: false, owner: "admin" },
        { id: 4, title: "Sapiens", author: "Y. N. Harari", year: 2011, category: "Tarih", price: "250 TL", image: "📗", trending: true, owner: "admin" },
        { id: 5, title: "Körlük", author: "Saramago", year: 1995, category: "Roman", price: "130 TL", image: "📓", trending: false, owner: "admin" },
        { id: 6, title: "Yüzüklerin Efendisi", author: "J.R.R. Tolkien", year: 1954, category: "Fantastik", price: "350 TL", image: "📔", trending: true, owner: "admin" },
        { id: 7, title: "Otomatik Portakal", author: "Anthony Burgess", year: 1962, category: "Bilim Kurgu", price: "110 TL", image: "📙", trending: false, owner: "admin" },
        { id: 8, title: "Nutuk", author: "M. Kemal Atatürk", year: 1927, category: "Tarih", price: "180 TL", image: "📕", trending: true, owner: "admin" },
        { id: 9, title: "Simyacı", author: "Paulo Coelho", year: 1988, category: "Roman", price: "100 TL", image: "📒", trending: false, owner: "admin" },
        { id: 10, title: "Zamanın Kısa Tarihi", author: "Stephen Hawking", year: 1988, category: "Bilim Kurgu", price: "210 TL", image: "📘", trending: true, owner: "admin" },
        { id: 11, title: "Şeker Portakalı", author: "José Mauro de Vasconcelos", year: 1968, category: "Roman", price: "90 TL", image: "📙", trending: true, owner: "admin" },
        { id: 12, title: "Hayvan Çiftliği", author: "George Orwell", year: 1945, category: "Roman", price: "85 TL", image: "📕", trending: false, owner: "admin" },
        { id: 13, title: "İnce Memed", author: "Yaşar Kemal", year: 1955, category: "Roman", price: "160 TL", image: "📗", trending: true, owner: "admin" },
        { id: 14, title: "Kürk Mantolu Madonna", author: "Sabahattin Ali", year: 1943, category: "Roman", price: "75 TL", image: "📓", trending: true, owner: "admin" },
        { id: 15, title: "Dönüşüm", author: "Franz Kafka", year: 1915, category: "Roman", price: "60 TL", image: "📔", trending: false, owner: "admin" },
        { id: 16, title: "Fareler ve İnsanlar", author: "John Steinbeck", year: 1937, category: "Roman", price: "80 TL", image: "📘", trending: false, owner: "admin" }
      ];
      localStorage.setItem('books', JSON.stringify(globalBooks));
    }
    setBooks(globalBooks);

    // 4. Kullanıcıya Özel İzole Veri Yönetimi
    const favKey = `favorites_${user.email}`;
    const cartKey = `cart_${user.email}`;

    // Favorileri eşitle
    const savedFavs = JSON.parse(localStorage.getItem(favKey)) || [];
    const validFavs = savedFavs.filter(id => globalBooks.some(b => b.id === id));
    setFavorites(validFavs);
    localStorage.setItem(favKey, JSON.stringify(validFavs));

    // Sepeti eşitle
    const savedCart = JSON.parse(localStorage.getItem(cartKey)) || [];
    const validCart = savedCart.filter(item => globalBooks.some(b => b.id === item.id));
    setCartCount(validCart.length);
    localStorage.setItem(cartKey, JSON.stringify(validCart));

  }, [navigate]);

  const toggleFavorite = (id) => {
    const favKey = `favorites_${currentUser.email}`;
    let currentFavs = JSON.parse(localStorage.getItem(favKey)) || [];
    
    if (currentFavs.includes(id)) {
      currentFavs = currentFavs.filter(fId => fId !== id);
    } else {
      currentFavs.push(id);
    }
    localStorage.setItem(favKey, JSON.stringify(currentFavs));
    setFavorites(currentFavs);
  };

  const handleAddToCart = (book) => {
    const cartKey = `cart_${currentUser.email}`;
    const currentCart = JSON.parse(localStorage.getItem(cartKey)) || [];
    currentCart.push(book);
    localStorage.setItem(cartKey, JSON.stringify(currentCart));
    setCartCount(currentCart.length);
  };

  // Filtreleme fonksiyonu
  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'Tümü' || book.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const initial = currentUser ? currentUser.fullName.charAt(0).toUpperCase() : 'U';

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-inter text-secondary pb-24 md:pb-0 antialiased overflow-x-hidden">
      
      {/* ÜST NAVBAR */}
      <header className="bg-white py-4 px-6 md:px-12 shadow-sm sticky top-0 z-50 flex flex-col md:flex-row gap-4 items-center justify-between border-b border-slate-100">
        <h1 onClick={() => navigate('/home')} className="font-playfair text-2xl font-bold tracking-wide whitespace-nowrap shrink-0 cursor-pointer">
          Page <span className="text-primary">Nest</span>
        </h1>

        <div className="relative w-full md:max-w-xl">
          <input 
            type="text" 
            placeholder="Kitap, yazar veya yayınevi ara..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#F5F3ED] text-secondary placeholder-secondary/50 px-5 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary text-sm transition-all"
          />
          <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary/50 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <div className="hidden md:flex items-center gap-6 shrink-0">
          <button onClick={() => navigate('/favorites')} className="text-secondary hover:text-primary transition-colors flex items-center gap-2 text-sm font-medium">
            <svg className={`w-5 h-5 ${favorites.length > 0 ? 'text-red-500' : 'text-slate-300'}`} fill="currentColor" viewBox="0 0 24 24"><path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"/></svg>
            Favoriler ({favorites.length})
          </button>
          <button onClick={() => navigate('/cart')} className="text-secondary hover:text-primary transition-colors flex items-center gap-2 text-sm font-medium">
            <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/></svg>
            Sepet ({cartCount})
          </button>
          <div onClick={() => navigate('/profile')} className="w-10 h-10 bg-primary text-white font-bold rounded-full flex items-center justify-center cursor-pointer hover:scale-105 shadow-md transition-transform">
            {initial}
          </div>
        </div>
      </header>

      <main className="p-6 md:p-12 max-w-7xl mx-auto space-y-10">
        
        {/* GERİ GELEN ÖNE ÇIKANLAR (Yatay Kaymalı Bölüm) */}
        {searchQuery === '' && activeCategory === 'Tümü' && (
          <section>
            <h2 className="font-playfair text-xl md:text-2xl font-bold mb-6 text-[#3A332C] flex items-center gap-2">
              <span>🔥</span> En Çok Tercih Edilenler
            </h2>
            <div className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar snap-x" style={{ scrollbarWidth: 'none' }}>
              {books.filter(b => b.trending).map(book => (
                <div key={`trend-${book.id}`} className="min-w-[220px] max-w-[220px] snap-center">
                  <BookCard 
                    book={book}
                    onFavorite={toggleFavorite}
                    onAddToCart={handleAddToCart}
                    isFavorite={favorites.includes(book.id)}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* KATEGORİ SEÇİM ALANI */}
        <section>
          <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat ? 'bg-primary text-white shadow-md' : 'bg-white text-secondary/70 border border-slate-200 hover:bg-[#F5F3ED]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* ANA KİTAP GRID ALANI */}
        <section>
          <h2 className="font-playfair text-xl md:text-2xl font-bold mb-6 text-[#3A332C]">
            {activeCategory === 'Tümü' ? 'Sizin İçin Seçilenler' : `${activeCategory} Kitapları`}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {filteredBooks.map((book) => (
              <BookCard 
                key={book.id}
                book={book}
                onFavorite={toggleFavorite}
                onAddToCart={handleAddToCart}
                isFavorite={favorites.includes(book.id)}
              />
            ))}
          </div>
          
          {filteredBooks.length === 0 && (
            <div className="col-span-full text-center py-12 text-slate-400">
              Aramanıza uygun kitap bulunamadı.
            </div>
          )}
        </section>
      </main>

      {/* MOBİL ALT NAVİGASYON */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-slate-100 flex justify-around items-center py-3 z-50 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.05)]">
        <button onClick={() => navigate('/home')} className="flex flex-col items-center text-primary">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.06 1.06l8.69-8.69z"/><path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75v4.5a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z"/></svg>
          <span className="text-[10px] font-bold mt-1">Keşfet</span>
        </button>
        <button onClick={() => navigate('/favorites')} className="flex flex-col items-center text-slate-400 hover:text-primary relative">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"/></svg>
          {favorites.length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">{favorites.length}</span>}
          <span className="text-[10px] font-medium mt-1">Favoriler</span>
        </button>
        <button onClick={() => navigate('/cart')} className="flex flex-col items-center text-slate-400 hover:text-primary relative">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/></svg>
          {cartCount > 0 && <span className="absolute -top-1 -right-2 bg-primary text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">{cartCount}</span>}
          <span className="text-[10px] font-medium mt-1">Sepetim</span>
        </button>
        <button onClick={() => navigate('/profile')} className="flex flex-col items-center text-slate-400 hover:text-primary">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd"/></svg>
          <span className="text-[10px] font-medium mt-1">Profil</span>
        </button>
      </nav>

    </div>
  );
}