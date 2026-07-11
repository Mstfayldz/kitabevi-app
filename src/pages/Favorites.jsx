import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookCard from '../components/BookCard';

export default function Favorites() {
  const navigate = useNavigate();
  const [favBooks, setFavBooks] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
      navigate('/');
      return;
    }
    setCurrentUser(user);

    const favKey = `favorites_${user.email}`; // Kullanıcıya özel kutu
    const allBooks = JSON.parse(localStorage.getItem('books')) || [];
    const favIds = JSON.parse(localStorage.getItem(favKey)) || [];
    
    // Global listeyle ID senkronizasyonu
    const matched = allBooks.filter(b => favIds.includes(b.id));
    setFavBooks(matched);
  }, [navigate]);

  // FAVORİLERDEN ÇIKARMA FONKSİYONU
  const handleRemoveFavorite = (id) => {
    if (!currentUser) return;
    const favKey = `favorites_${currentUser.email}`;
    let favIds = JSON.parse(localStorage.getItem(favKey)) || [];
    
    // ID'yi listeden ayıkla
    favIds = favIds.filter(fId => fId !== id);
    localStorage.setItem(favKey, JSON.stringify(favIds));
    
    // Ekranda anında güncelle (Sayaç ve grid otomatik düşer)
    setFavBooks(favBooks.filter(b => b.id !== id));
  };

  // Favoriler sayfasından da sepete eklenebilsin diye izole fonksiyon
  const handleAddToCartFromFav = (book) => {
    if (!currentUser) return;
    const cartKey = `cart_${currentUser.email}`;
    const currentCart = JSON.parse(localStorage.getItem(cartKey)) || [];
    currentCart.push(book);
    localStorage.setItem(cartKey, JSON.stringify(currentCart));
    alert(`${book.title} sepetinize eklendi!`);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-inter p-6 md:p-12 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-playfair text-3xl font-bold text-[#3A332C]">Favorilerim</h1>
        <button onClick={() => navigate('/home')} className="text-primary font-bold hover:underline">← Keşfet'e Dön</button>
      </div>

      {favBooks.length === 0 ? (
        <div className="text-center py-20 text-slate-400 bg-white rounded-[32px] border border-slate-100 shadow-sm">
          Henüz favorilerinize eklediğiniz bir kitap bulunmuyor.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {favBooks.map(book => (
            <div key={book.id} className="relative group">
              <BookCard 
                book={book} 
                isFavorite={true} 
                onFavorite={handleRemoveFavorite} // Kalbe basınca listeden çıkarır
                onAddToCart={handleAddToCartFromFav} // Sepete ekleme düğmesi
              />
              
              {/* Kartın hemen altına ekstra bir net buton isteyenler için */}
              <button 
                onClick={() => handleRemoveFavorite(book.id)}
                className="w-full mt-2 text-xs font-bold text-red-500 bg-red-50 py-2 rounded-xl border border-transparent hover:border-red-200 transition-all"
              >
                Favorilerden Çıkar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}