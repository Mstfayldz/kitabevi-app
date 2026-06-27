import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
      const globalOrders = JSON.parse(localStorage.getItem('orders')) || [];

      // sepetteki her ürün için satıcıya bir sipariş oluştur
      cartItems.forEach(item => {
        globalOrders.push({
          id: Date.now() + Math.random(),
          bookTitle: item.title,
          price: item.price,
          sellerEmail: item.owner, // kitabı kim eklediyse ona gidecek
          buyerName: currentUser.fullName,
          date: new Date().toLocaleDateString()
        });
      });

      localStorage.setItem('orders', JSON.stringify(globalOrders));
      localStorage.removeItem('cart'); // sepeti boşalt
      
      alert('Sipariş başarıyla oluşturuldu!');
      navigate('/profile');
    }, 1500); // sahte ödeme bekleme süresi
  };

  return (
    <div className="min-h-screen bg-base font-inter flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full border border-slate-100">
        <h2 className="font-playfair text-2xl font-bold mb-6 text-center">Güvenli Ödeme</h2>
        
        <form onSubmit={handlePayment} className="space-y-4">
          <input type="text" required placeholder="Kart Üzerindeki İsim" className="w-full p-4 bg-surface rounded-xl focus:outline-none focus:ring-2 focus:ring-primary" />
          <input type="text" required placeholder="Kart Numarası (0000 0000 0000 0000)" maxLength="19" className="w-full p-4 bg-surface rounded-xl focus:outline-none focus:ring-2 focus:ring-primary" />
          <div className="flex gap-4">
            <input type="text" required placeholder="AA/YY" className="w-1/2 p-4 bg-surface rounded-xl focus:outline-none focus:ring-2 focus:ring-primary" />
            <input type="text" required placeholder="CVV" maxLength="3" className="w-1/2 p-4 bg-surface rounded-xl focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          
          <button type="submit" disabled={isProcessing} className="w-full py-4 mt-4 bg-secondary text-white font-bold rounded-xl shadow-lg hover:bg-secondary/90 transition-all disabled:opacity-50">
            {isProcessing ? 'Ödeme Alınıyor...' : 'Siparişi Tamamla'}
          </button>
        </form>
        
        <button onClick={() => navigate('/cart')} className="w-full mt-4 text-divider hover:text-secondary font-medium">İptal Et</button>
      </div>
    </div>
  );
}