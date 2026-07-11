import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function BookCard({ book, onFavorite, onAddToCart, isFavorite, showDelete, onDelete }) {
  const navigate = useNavigate();
  const priceParts = book.price.split(' ');

  return (
    <div className="bg-white p-5 rounded-[32px] shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col hover:shadow-lg transition-all duration-300 group">
      
      <div onClick={() => navigate(`/book/${book.id}`)} className="text-[75px] mb-6 mt-2 text-center cursor-pointer group-hover:scale-105 transition-transform duration-300">
        {book.image}
      </div>

      <div className="text-left flex-1">
        <h3 onClick={() => navigate(`/book/${book.id}`)} className="font-bold text-[#3A332C] text-[15px] leading-tight line-clamp-1 cursor-pointer hover:text-primary">
          {book.title}
        </h3>
        <p className="text-[13px] text-slate-500 mt-1 line-clamp-1">{book.author}</p>
      </div>
      
      <div className="w-full h-px bg-slate-100 my-4"></div>
      
      <div className="flex justify-between items-end">
        <div className="flex flex-col text-primary font-bold">
          <span className="text-[17px] mb-1">{priceParts[0]}</span>
          <span className="text-[13px]">{priceParts[1] || 'TL'}</span>
        </div>
        
        <div className="flex items-center gap-2">
          {onFavorite && (
            <button onClick={() => onFavorite(book.id)} className="transition-transform active:scale-75 p-1">
              <svg className={`w-[22px] h-[22px] ${isFavorite ? 'text-red-500' : 'text-slate-300'}`} fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"/>
              </svg>
            </button>
          )}
          
          <button onClick={() => navigate(`/book/${book.id}`)} className="text-[13px] font-bold bg-[#EFE8D8] text-[#4A3F35] px-3 py-1.5 rounded-[10px]">
            İncele
          </button>

          {onAddToCart && (
            <button onClick={() => onAddToCart(book)} className="text-[#4A3F35] hover:text-primary p-1">
              <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/>
              </svg>
            </button>
          )}

          {showDelete && (
            <button onClick={() => onDelete(book.id)} className="text-red-500 font-bold text-xs ml-2">Sil</button>
          )}
        </div>
      </div>
    </div>
  );
}