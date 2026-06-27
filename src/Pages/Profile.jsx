import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('kitaplarim'); 
  
  const [myBooks, setMyBooks] = useState([]);
  const [myOrders, setMyOrders] = useState([]); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBook, setNewBook] = useState({ title: '', author: '', price: '', category: 'Roman', year: '' });

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
      navigate('/');
      return;
    }
    setUser(currentUser);

    // global listeyi çek ve benim eklediklerimi filtrele
    const allBooks = JSON.parse(localStorage.getItem('books')) || [];
    setMyBooks(allBooks.filter(b => b.owner === currentUser?.email));

    // bana gelen siparişleri (baskasi benim kitabimi aldiysa) filtrele
    const allOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setMyOrders(allOrders.filter(o => o.sellerEmail === currentUser?.email));
  }, [navigate]);

  // Yeni kitap eklenirken otomatik rastgele şık ikon seçici
  const getRandomBookIcon = () => {
    const icons = ["📘", "📕", "📗", "📙", "📓", "📔", "📒"];
    return icons[Math.floor(Math.random() * icons.length)];
  };

  const handleAddBook = (e) => {
    e.preventDefault();
    const allBooks = JSON.parse(localStorage.getItem('books')) || [];
    
    const bookToAdd = {
      ...newBook,
      id: Date.now(),
      owner: user.email, 
      image: getRandomBookIcon(), // Rastgele şık ikon ataması burada yapılıyor!
      trending: false
    };

    // hem globale hem yerel state'e ekle (Anında senkronizasyon)
    const updatedBooks = [...allBooks, bookToAdd];
    localStorage.setItem('books', JSON.stringify(updatedBooks));
    setMyBooks([...myBooks, bookToAdd]);
    
    setIsModalOpen(false);
    setNewBook({ title: '', author: '', price: '', category: 'Roman', year: '' });
  };

 const handleDelete = (id) => {
    if(window.confirm("Bu kitabı silersen herkesin keşfet ekranından, sepetinden ve favorilerinden kalkacak. Emin misin?")) {
      
      // 1. Kitabı ana veri tabanından (Global) sil
      const allBooks = JSON.parse(localStorage.getItem('books')) || [];
      const updatedAllBooks = allBooks.filter(b => b.id !== id);
      localStorage.setItem('books', JSON.stringify(updatedAllBooks));
      
      // 2. Hayalet Veri Temizliği (Sepetlerden sil)
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const updatedCart = cart.filter(b => b.id !== id);
      localStorage.setItem('cart', JSON.stringify(updatedCart));

      // 3. Hayalet Veri Temizliği (Favorilerden sil - SAYAÇ BUG'I BURADA ÇÖZÜLÜYOR!)
      const favs = JSON.parse(localStorage.getItem('favorites')) || [];
      const updatedFavs = favs.filter(fId => fId !== id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavs));

      // 4. Kendi ekranından anında sil (State güncellemesi)
      setMyBooks(myBooks.filter(b => b.id !== id));
    }
  };
  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-inter text-secondary pb-10">
      
      {/* ÜST HEADER */}
      <header className="bg-white py-4 px-6 md:px-12 flex justify-between items-center shadow-sm sticky top-0 z-40 border-b border-slate-100">
        <h1 onClick={() => navigate('/home')} className="font-playfair text-xl md:text-2xl font-bold cursor-pointer flex items-center gap-2">
          ← <span className="text-primary hover:underline">Keşfet'e Dön</span>
        </h1>
        <button onClick={() => { localStorage.removeItem('currentUser'); navigate('/'); }} className="text-sm font-bold text-red-500 hover:text-red-600 bg-red-50 px-4 py-2 rounded-[10px] transition-colors">
          Çıkış Yap
        </button>
      </header>

      <main className="max-w-5xl mx-auto p-6 md:p-12">
        
        {/* PROFİL KARTI */}
        <div className="bg-white rounded-[32px] p-8 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-slate-100 flex items-center gap-6 mb-10">
          <div className="w-20 h-20 bg-primary text-white text-3xl font-bold rounded-full flex items-center justify-center shadow-md shrink-0">
            {user.fullName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="font-playfair text-2xl md:text-3xl font-bold mb-1 text-[#3A332C]">{user.fullName}</h2>
            <p className="text-slate-500">{user.email}</p>
          </div>
        </div>

        {/* SEKMELER */}
        <div className="flex gap-6 border-b border-slate-200 mb-8 overflow-x-auto hide-scrollbar">
          <button onClick={() => setActiveTab('kitaplarim')} className={`pb-3 font-bold whitespace-nowrap transition-colors ${activeTab === 'kitaplarim' ? 'text-primary border-b-2 border-primary' : 'text-slate-400 hover:text-secondary'}`}>
            Eklediğim Kitaplar
          </button>
          <button onClick={() => setActiveTab('gelenSiparisler')} className={`pb-3 font-bold whitespace-nowrap transition-colors flex items-center gap-2 ${activeTab === 'gelenSiparisler' ? 'text-primary border-b-2 border-primary' : 'text-slate-400 hover:text-secondary'}`}>
            Benden İstenenler 
            {myOrders.length > 0 && (
              <span className="bg-red-100 text-red-600 text-[10px] px-2 py-0.5 rounded-full">{myOrders.length}</span>
            )}
          </button>
        </div>

        {/* KİTAPLARIM SEKMESİ */}
        {activeTab === 'kitaplarim' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-xl text-[#3A332C]">Pazaryerine Eklediğin Kitaplar</h3>
              <button onClick={() => setIsModalOpen(true)} className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold shadow-md hover:-translate-y-0.5 transition-all">
                + Yeni Kitap Sat
              </button>
            </div>

            {myBooks.length === 0 ? (
              <div className="text-center py-12 text-slate-400 bg-white rounded-[32px] border border-slate-100">
                Henüz satışa çıkardığın bir kitap yok.
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {myBooks.map(book => (
                  <div key={book.id} className="bg-white p-5 rounded-[24px] shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col group hover:shadow-lg transition-all duration-300">
                    
                    <div className="text-[65px] text-center mb-4 mt-2 group-hover:scale-105 transition-transform duration-300 drop-shadow-sm">
                      {book.image}
                    </div>
                    
                    <h4 className="font-bold text-[15px] text-[#3A332C] truncate">{book.title}</h4>
                    <p className="text-[13px] text-slate-500 mt-1 mb-4">{book.price}</p>
                    
                    <div className="w-full h-px bg-slate-100 mb-3"></div>
                    
                    <div className="mt-auto flex justify-between items-center">
                      <button onClick={() => navigate(`/book/${book.id}`)} className="text-[12px] font-bold text-primary hover:underline">
                        Görüntüle
                      </button>
                      <button onClick={() => handleDelete(book.id)} className="text-[12px] font-bold text-red-500 hover:text-red-600 hover:underline">
                        Kaldır
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* GELEN SİPARİŞLER SEKMESİ */}
        {activeTab === 'gelenSiparisler' && (
          <div className="bg-white rounded-[32px] shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden">
            <div className="p-6 md:p-8 border-b border-slate-100 bg-[#F5F3ED]/50">
              <h3 className="font-bold text-xl text-[#3A332C]">Senden Sipariş Edilen Kitaplar</h3>
              <p className="text-sm text-slate-500 mt-1">Kullanıcılar eklediğin kitapları satın aldığında buraya düşer.</p>
            </div>
            
            {myOrders.length === 0 ? (
              <p className="p-12 text-center text-slate-400">Henüz bir sipariş almadın.</p>
            ) : (
              <div className="divide-y divide-slate-100">
                {myOrders.map(order => (
                  <div key={order.id} className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="mb-4 md:mb-0">
                      <p className="font-bold text-[#3A332C] text-lg">{order.bookTitle}</p>
                      <p className="text-sm text-slate-500 mt-1">
                        Alıcı: <span className="font-medium text-secondary">{order.buyerName}</span> • Tarih: {order.date}
                      </p>
                    </div>
                    <div className="text-left md:text-right flex md:flex-col items-center md:items-end gap-4 md:gap-2">
                      <span className="font-bold text-primary text-xl">{order.price}</span>
                      <button className="text-xs font-bold bg-[#EFE8D8] text-[#4A3F35] hover:bg-[#E4DAC4] px-4 py-2 rounded-[10px] transition-colors">
                        Kargola
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>

      {/* YENİ KİTAP EKLEME MODALI */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#3A332C]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] w-full max-w-md p-8 shadow-2xl">
            <h2 className="font-playfair text-2xl font-bold mb-6 text-[#3A332C]">Pazaryerine Kitap Ekle</h2>
            
            <form onSubmit={handleAddBook} className="space-y-4">
              <input type="text" required placeholder="Kitap Adı" value={newBook.title} onChange={(e) => setNewBook({...newBook, title: e.target.value})} className="w-full px-4 py-3.5 bg-[#F5F3ED] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
              <input type="text" required placeholder="Yazar Adı" value={newBook.author} onChange={(e) => setNewBook({...newBook, author: e.target.value})} className="w-full px-4 py-3.5 bg-[#F5F3ED] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
              
              <div className="flex gap-4">
                <input type="number" required placeholder="Basım Yılı" value={newBook.year} onChange={(e) => setNewBook({...newBook, year: e.target.value})} className="w-1/2 px-4 py-3.5 bg-[#F5F3ED] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
                <select value={newBook.category} onChange={(e) => setNewBook({...newBook, category: e.target.value})} className="w-1/2 px-4 py-3.5 bg-[#F5F3ED] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-sm text-secondary">
                  <option value="Roman">Roman</option>
                  <option value="Bilim Kurgu">Bilim Kurgu</option>
                  <option value="Fantastik">Fantastik</option>
                  <option value="Tarih">Tarih</option>
                </select>
              </div>

              <input type="text" required placeholder="Fiyat (Örn: 150 TL)" value={newBook.price} onChange={(e) => setNewBook({...newBook, price: e.target.value})} className="w-full px-4 py-3.5 bg-[#F5F3ED] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
              
              <div className="flex gap-4 pt-4 mt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3.5 font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition-colors">İptal</button>
                <button type="submit" className="flex-1 py-3.5 font-bold bg-primary text-white rounded-xl shadow-md hover:-translate-y-0.5 transition-all">Satışa Çıkar</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}