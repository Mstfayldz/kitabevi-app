import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
      navigate('/');
      return;
    }
    setUser(currentUser);

    const cartKey = `cart_${currentUser.email}`;
    const savedCart = JSON.parse(localStorage.getItem(cartKey)) || [];
    
    // Kitaplar hala sistemde duruyor mu kontrolü (Hayalet veri koruması)
    const allBooks = JSON.parse(localStorage.getItem('books')) || [];
    const validItems = savedCart.filter(item => allBooks.some(b => b.id === item.id));
    
    setCartItems(validItems);
    calculateTotal(validItems);
    localStorage.setItem(cartKey, JSON.stringify(validItems));
  }, [navigate]);

  // Toplam fiyatı hesaplama fonksiyonu
  const calculateTotal = (items) => {
    const sum = items.reduce((acc, item) => acc + parseInt(item.price), 0);
    setTotal(sum);
  };

  // TEK BİR ÜRÜNÜ SEPETTEN SİLME (İndex bazlı silme, aynı kitaptan iki tane varsa karışmaz)
  const handleRemoveItem = (indexToRemove) => {
    if (!user) return;
    const cartKey = `cart_${user.email}`;
    const updatedCart = cartItems.filter((_, idx) => idx !== indexToRemove);
    
    localStorage.setItem(cartKey, JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    calculateTotal(updatedCart);
  };

  // Tüm sepeti boşaltma
  const clearCart = () => {
    if (!user) return;
    const cartKey = `cart_${user.email}`;
    localStorage.removeItem(cartKey);
    setCartItems([]);
    setTotal(0);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-inter p-6 md:p-12 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-playfair text-3xl font-bold text-[#3A332C]">Sepetim</h1>
        <button onClick={() => navigate('/home')} className="text-primary font-bold hover:underline">← Keşfet'e Dön</button>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-20 text-slate-400 bg-white rounded-[32px] border border-slate-100 shadow-sm">
          Sepetiniz şu an boş.
        </div>
      ) : (
        <div className="bg-white rounded-[32px] p-6 md:p-8 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-slate-100">
          <div className="divide-y divide-slate-100">
            {cartItems.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="flex items-center justify-between py-5 first:pt-2 last:pb-2">
                <div className="flex items-center gap-4">
                  <span className="text-5xl drop-shadow-sm">{item.image}</span>
                  <div className="text-left">
                    <h3 className="font-bold text-[#3A332C] text-[16px]">{item.title}</h3>
                    <p className="text-sm text-slate-500 mt-0.5">{item.author}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <span className="font-bold text-primary text-lg">{item.price}</span>
                  {/* Bireysel Silme Butonu */}
                  <button 
                    onClick={() => handleRemoveItem(idx)} 
                    className="text-xs font-bold text-red-500 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-lg transition-colors"
                  >
                    Sil
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <p className="text-sm text-slate-400 text-left">Toplam Tutar</p>
              <p className="text-3xl font-bold text-[#3A332C] mt-1">{total} TL</p>
            </div>
            <div className="flex gap-4 w-full sm:w-auto">
              <button onClick={clearCart} className="flex-1 sm:flex-none px-6 py-3.5 text-slate-400 font-bold hover:bg-slate-50 rounded-xl transition-colors">
                Sepeti Temizle
              </button>
              <button onClick={() => navigate('/checkout')} className="flex-1 sm:flex-none px-8 py-3.5 bg-primary text-white font-bold rounded-xl shadow-md hover:bg-primary/90 hover:-translate-y-0.5 transition-all">
                Satın Al →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}