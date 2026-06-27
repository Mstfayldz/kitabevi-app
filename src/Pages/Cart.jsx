import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // şimdilik basit mock
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
    
    // toplam fiyat hesabı
    const sum = savedCart.reduce((acc, item) => acc + parseInt(item.price), 0);
    setTotal(sum);
  }, []);

  const clearCart = () => {
    localStorage.removeItem('cart');
    setCartItems([]);
    setTotal(0);
  };

  return (
    <div className="min-h-screen bg-base font-inter p-6 md:p-12 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-playfair text-3xl font-bold text-secondary">Sepetim</h1>
        <button onClick={() => navigate('/home')} className="text-primary font-bold hover:underline">← Keşfet'e Dön</button>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-20 text-divider">Sepetin şu an boş.</div>
      ) : (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          {cartItems.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between border-b border-slate-100 py-4 last:border-0">
              <div className="flex items-center gap-4">
                <span className="text-4xl">{item.image}</span>
                <div>
                  <h3 className="font-bold text-secondary">{item.title}</h3>
                  <p className="text-sm text-divider">{item.author}</p>
                </div>
              </div>
              <span className="font-bold text-primary text-lg">{item.price}</span>
            </div>
          ))}
          
          <div className="mt-8 pt-6 border-t border-slate-200 flex justify-between items-center">
            <div>
              <p className="text-sm text-divider">Toplam Tutar</p>
              <p className="text-3xl font-bold text-secondary">{total} TL</p>
            </div>
            <div className="flex gap-4">
              <button onClick={clearCart} className="px-6 py-3 text-red-500 font-bold hover:bg-red-50 rounded-xl transition-colors">Temizle</button>
              <button onClick={() => navigate('/checkout')} className="px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-primary/90 transition-all hover:-translate-y-1">
                Satın Al →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}