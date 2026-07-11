import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // 1. Oturum Kontrolü
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
      navigate('/');
      return;
    }
    setCurrentUser(user);

    // 2. Kitap Verisini Bul
    const allBooks = JSON.parse(localStorage.getItem('books')) || [];
    const foundBook = allBooks.find(b => b.id.toString() === id);
    setBook(foundBook);

    // 3. Kullanıcıya Özel Favori Durumunu Kontrol Et
    if (foundBook) {
      const favKey = `favorites_${user.email}`; // Kişiye özel anahtar
      const favs = JSON.parse(localStorage.getItem(favKey)) || [];
      setIsFavorite(favs.includes(foundBook.id));
    }
  }, [id, navigate]);

  const toggleFavorite = () => {
    if (!currentUser || !book) return;
    
    const favKey = `favorites_${currentUser.email}`; // Kişiye özel anahtar
    let favs = JSON.parse(localStorage.getItem(favKey)) || [];
    
    if (favs.includes(book.id)) {
      favs = favs.filter(fId => fId !== book.id);
      setIsFavorite(false);
    } else {
      favs.push(book.id);
      setIsFavorite(true);
    }
    localStorage.setItem(favKey, JSON.stringify(favs));
  };

  const handleAddToCart = () => {
    if (!currentUser || !book) return;
    
    const cartKey = `cart_${currentUser.email}`; // Kişiye özel anahtar
    const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    
    cart.push(book);
    localStorage.setItem(cartKey, JSON.stringify(cart));
    alert(`${book.title} başarıyla sepetinize eklendi!`);
  };

  if (!book) return <div className="p-10 text-center mt-20 text-slate-500">Kitap yükleniyor veya bulunamadı...</div>;

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-inter p-6 md:p-12">
      <button onClick={() => navigate(-1)} className="mb-6 font-bold text-primary hover:underline flex items-center gap-2">
        ← Geri Dön
      </button>
      
      <div className="max-w-4xl mx-auto bg-white rounded-[32px] shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden flex flex-col md:flex-row">
        
        {/* SOL KISIM: KİTAP GÖRSELİ (Açık Kitap Yok, Tam İstediğin Standart Kapalı Kitap) */}
        <div className="md:w-2/5 bg-[#F5F3ED] min-h-[300px] flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-100 py-12">
          <span className="text-[120px] drop-shadow-md hover:scale-105 transition-transform duration-300">
            {book.image}
          </span>
        </div>
        
        {/* SAĞ KISIM: DETAYLAR */}
        <div className="p-8 md:p-12 md:w-3/5 flex flex-col justify-center">
          <div className="uppercase tracking-widest text-[11px] font-bold text-slate-400 mb-2">
            {book.category} • {book.year}
          </div>
          <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-2 text-[#3A332C]">{book.title}</h1>
          <p className="text-lg text-slate-500 mb-6">{book.author}</p>
          
          <p className="text-sm leading-relaxed text-slate-500 mb-8">
            Bu kitap, yazarın en önemli eserlerinden biridir. Page Nest kullanıcıları tarafından sıklıkla tercih edilmekte ve okunmaktadır. Ekleyen satıcı: <span className="font-bold text-secondary">{book.owner === 'admin' ? 'Page Nest' : book.owner}</span>
          </p>

          <div className="mt-auto flex items-center justify-between">
            <span className="text-3xl font-bold text-primary">{book.price}</span>
            
            <div className="flex gap-3 items-center">
              {/* Favori Kalp Butonu */}
              <button onClick={toggleFavorite} className="p-3.5 bg-[#F5F3ED] rounded-xl hover:bg-[#E4DAC4] transition-colors text-xl">
                {isFavorite ? '❤️' : '🤍'}
              </button>
              
              {/* Sepete Ekle Butonu */}
              <button onClick={handleAddToCart} className="bg-primary text-white px-6 md:px-8 py-3.5 rounded-xl font-bold shadow-md hover:bg-primary/90 hover:-translate-y-0.5 transition-all flex items-center gap-2">
                Sepete Ekle 
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/>
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}