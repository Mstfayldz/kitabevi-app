import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [myBooks, setMyBooks] = useState([]);
  
  // Form State'leri
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [category, setCategory] = useState('Roman');
  const [price, setPrice] = useState('');
  
  // Düzenleme Modu State'i
  const [editingBookId, setEditingBookId] = useState(null);

  const categories = ["Roman", "Bilim Kurgu", "Fantastik", "Tarih"];
  const icons = ["📘", "📕", "📗", "📙", "📓", "📔", "📒"];

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
      navigate('/');
      return;
    }
    setCurrentUser(user);

    // Kullanıcının kendi eklediği kitapları filtrele
    const allBooks = JSON.parse(localStorage.getItem('books')) || [];
    const userBooks = allBooks.filter(b => b.owner === user.email);
    setMyBooks(userBooks);
  }, [navigate]);

  // EKLEME VE GÜNCELLEME İŞLEMİ
  const handleSaveBook = (e) => {
    e.preventDefault();
    if (!title || !author || !year || !price) {
      alert("Lütfen tüm alanları doldurun!");
      return;
    }

    const allBooks = JSON.parse(localStorage.getItem('books')) || [];

    if (editingBookId) {
      // DÜZENLEME MODU (UPDATE)
      const updatedBooks = allBooks.map(b => {
        if (b.id === editingBookId) {
          return {
            ...b,
            title,
            author,
            year: parseInt(year),
            category,
            price: price.endsWith("TL") ? price : `${price} TL`
          };
        }
        return b;
      });

      localStorage.setItem('books', JSON.stringify(updatedBooks));
      
      // Ekranda anlık güncelle
      setMyBooks(updatedBooks.filter(b => b.owner === currentUser.email));
      setEditingBookId(null); // Düzenleme modundan çık
      alert("Kitap başarıyla güncellendi!");
    } else {
      // YENİ KİTAP EKLEME MODU (CREATE)
      const randomIcon = icons[Math.floor(Math.random() * icons.length)];
      const newBook = {
        id: Date.now(),
        title,
        author,
        year: parseInt(year),
        category,
        price: price.endsWith("TL") ? price : `${price} TL`,
        image: randomIcon,
        trending: false,
        owner: currentUser.email
      };

      const updatedBooks = [...allBooks, newBook];
      localStorage.setItem('books', JSON.stringify(updatedBooks));
      setMyBooks([...myBooks, newBook]);
      alert("Kitap başarıyla eklendi!");
    }

    // Formu temizle
    setTitle('');
    setAuthor('');
    setYear('');
    setPrice('');
    setCategory('Roman');
  };

  // DÜZENLEME MODUNU TETİKLEME (Formu doldurur)
  const handleEditClick = (book) => {
    setEditingBookId(book.id);
    setTitle(book.title);
    setAuthor(book.author);
    setYear(book.year);
    setCategory(book.category);
    setPrice(book.price.replace(" TL", "")); // Sadece sayısal kısmı forma al
  };

  // İPTAL ETME
  const handleCancelEdit = () => {
    setEditingBookId(null);
    setTitle('');
    setAuthor('');
    setYear('');
    setPrice('');
    setCategory('Roman');
  };

  // KİTAP SİLME (DELETE)
  const handleDelete = (id) => {
    if(window.confirm("Bu kitabı silmek istediğinize emin misiniz? Sepetlerden ve favorilerden de temizlenecektir.")) {
      const allBooks = JSON.parse(localStorage.getItem('books')) || [];
      const updatedAllBooks = allBooks.filter(b => b.id !== id);
      localStorage.setItem('books', JSON.stringify(updatedAllBooks));
      
      // İzole sepet ve favori temizlikleri
      const cartKey = `cart_${currentUser.email}`;
      const favKey = `favorites_${currentUser.email}`;
      
      const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
      localStorage.setItem(cartKey, JSON.stringify(cart.filter(b => b.id !== id)));

      const favs = JSON.parse(localStorage.getItem(favKey)) || [];
      localStorage.setItem(favKey, JSON.stringify(favs.filter(fId => fId !== id)));

      setMyBooks(myBooks.filter(b => b.id !== id));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-inter p-6 md:p-12 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
        <div>
          <h1 className="font-playfair text-3xl font-bold text-[#3A332C]">Profil Paneli</h1>
          <p className="text-sm text-slate-500 mt-1">Hoş geldin, {currentUser?.fullName}</p>
        </div>
        <div className="flex gap-4">
          <button onClick={() => navigate('/home')} className="px-4 py-2 bg-slate-100 text-secondary font-bold rounded-xl hover:bg-slate-200 transition-colors">← Keşfet</button>
          <button onClick={handleLogout} className="px-4 py-2 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition-colors">Çıkış Yap</button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* SOL: KİTAP EKLEME / DÜZENLEME FORMU */}
        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm h-fit">
          <h2 className="font-playfair text-xl font-bold mb-4 text-[#3A332C]">
            {editingBookId ? "📝 Kitabı Düzenle" : "➕ Yeni Kitap İlanı"}
          </h2>
          <form onSubmit={handleSaveBook} className="space-y-4 text-left">
            <div>
              <label className="text-xs font-bold text-slate-400 block mb-1">Kitap Adı</label>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-[#F5F3ED] px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 block mb-1">Yazar</label>
              <input type="text" value={author} onChange={e => setAuthor(e.target.value)} className="w-full bg-[#F5F3ED] px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">Basım Yılı</label>
                <input type="number" value={year} onChange={e => setYear(e.target.value)} className="w-full bg-[#F5F3ED] px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">Fiyat (TL)</label>
                <input type="number" value={price} onChange={e => setPrice(e.target.value)} className="w-full bg-[#F5F3ED] px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-sm" placeholder="Örn: 150" />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 block mb-1">Kategori</label>
              <select value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-[#F5F3ED] px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-sm">
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex gap-2 pt-2">
              {editingBookId && (
                <button type="button" onClick={handleCancelEdit} className="flex-1 py-3 bg-slate-100 text-secondary font-bold rounded-xl text-sm">İptal</button>
              )}
              <button type="submit" className="flex-1 py-3 bg-primary text-white font-bold rounded-xl text-sm shadow-md hover:bg-primary/90 transition-colors">
                {editingBookId ? "Değişiklikleri Kaydet" : "İlanı Yayınla"}
              </button>
            </div>
          </form>
        </div>

        {/* SAĞ: KULLANICININ KENDİ İLANLARI */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="font-playfair text-xl font-bold text-[#3A332C] text-left">İlanlarım ({myBooks.length})</h2>
          {myBooks.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-[32px] border border-slate-100 text-slate-400 shadow-sm">Henüz bir kitap ilanı eklemediniz.</div>
          ) : (
            <div className="space-y-3">
              {myBooks.map(book => (
                <div key={book.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{book.image}</span>
                    <div className="text-left">
                      <h3 className="font-bold text-secondary text-sm">{book.title}</h3>
                      <p className="text-xs text-slate-400">{book.author} • <span className="text-primary font-medium">{book.category}</span></p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-secondary text-sm">{book.price}</span>
                    {/* DÜZENLEME BUTONU */}
                    <button onClick={() => handleEditClick(book)} className="text-xs font-bold text-primary bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-lg transition-colors">Düzenle</button>
                    {/* SİLME BUTONU */}
                    <button onClick={() => handleDelete(book.id)} className="text-xs font-bold text-red-500 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors">Sil</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}