import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Favorites() {
  const navigate = useNavigate();
  const [favoriteBooks, setFavoriteBooks] = useState([]);

  useEffect(() => {
    const allBooks = JSON.parse(localStorage.getItem('books')) || [];
    const favIds = JSON.parse(localStorage.getItem('favorites')) || [];
    
    // Sadece favoriye eklenen ID'lere sahip kitapları filtrele
    setFavoriteBooks(allBooks.filter(book => favIds.includes(book.id)));
  }, []);

  const removeFavorite = (id) => {
    let favIds = JSON.parse(localStorage.getItem('favorites')) || [];
    favIds = favIds.filter(fId => fId !== id);
    localStorage.setItem('favorites', JSON.stringify(favIds));
    
    // Ekrandan da anında sil
    setFavoriteBooks(favoriteBooks.filter(b => b.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-inter p-6 md:p-12 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-playfair text-3xl font-bold text-[#3A332C]">Favorilerim</h1>
        <button onClick={() => navigate('/home')} className="text-primary font-bold hover:underline">← Keşfet'e Dön</button>
      </div>

      {favoriteBooks.length === 0 ? (
        <div className="text-center py-20 text-slate-400 bg-white rounded-[32px] border border-slate-100">
          Henüz favorilere eklediğin bir kitap yok.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {favoriteBooks.map(book => (
            <div key={book.id} className="bg-white p-5 rounded-[32px] shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col group">
              <div onClick={() => navigate(`/book/${book.id}`)} className="text-[75px] mb-6 mt-2 text-center cursor-pointer group-hover:scale-105 transition-transform duration-300 drop-shadow-sm">
                {book.image}
              </div>
              <h3 className="font-bold text-[#3A332C] text-[15px] truncate">{book.title}</h3>
              <p className="text-[13px] text-slate-500 mt-1 mb-4">{book.price}</p>
              
              <div className="w-full h-px bg-slate-100 mb-3"></div>
              
              <div className="mt-auto flex justify-between items-center">
                <button onClick={() => navigate(`/book/${book.id}`)} className="text-[12px] font-bold text-primary hover:underline">
                  İncele
                </button>
                <button onClick={() => removeFavorite(book.id)} className="text-[12px] font-bold text-red-500 hover:text-red-600 hover:underline">
                  Favoriden Çıkar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}