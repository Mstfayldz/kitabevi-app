import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });

  const handleRegister = (e) => {
    e.preventDefault();
    // eski kullanıcıları çek, yoksa boş dizi oluştur
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // aynı mailden var mı kontrol et
    if (users.find(u => u.email === formData.email)) {
      alert('Bu e-posta zaten kayıtlı!');
      return;
    }

    // yeni kullanıcıyı kaydet
    users.push(formData);
    localStorage.setItem('users', JSON.stringify(users));
    
    alert('Kayıt başarılı! Şimdi giriş yapabilirsin.');
    navigate('/'); // logine gönder
  };

  return (
    <div className="min-h-screen bg-base md:bg-surface/30 font-inter text-secondary flex items-center justify-center md:p-6 antialiased">
      <div className="flex flex-col md:flex-row w-full md:max-w-4xl min-h-screen md:min-h-[600px] bg-base md:bg-white md:rounded-[40px] md:shadow-2xl overflow-hidden">
        
        <header className="bg-secondary text-base pt-14 pb-8 md:py-12 px-8 md:w-1/2 rounded-b-[40px] md:rounded-none flex flex-col items-center justify-center z-10 relative">
          <div className="bg-base p-4 md:p-6 rounded-2xl mb-4 shadow-inner">
            <span className="text-secondary font-bold text-3xl font-playfair">📄</span>
          </div>
          <h1 className="font-playfair text-3xl md:text-5xl font-bold tracking-wide text-center">
            Page <span className="text-primary">Nest</span>
          </h1>
          <p className="text-xs md:text-sm tracking-[0.3em] uppercase mt-2 opacity-90 text-center">
            AİLEYE KATIL
          </p>
        </header>

        <main className="flex-1 flex flex-col justify-center px-6 py-8 md:p-12 md:w-1/2 bg-base md:bg-transparent">
          <div className="mb-8 text-center md:text-left">
            <h2 className="font-playfair text-[24px] md:text-[32px] font-bold text-secondary mb-2">Aramıza Hoş Geldin</h2>
            <p className="font-inter text-[16px] text-divider">Hemen hesabını oluştur</p>
          </div>

          <form className="space-y-5" onSubmit={handleRegister}>
            <div>
              <label className="block text-[12px] md:text-[13px] font-bold tracking-wider text-secondary uppercase mb-2">AD SOYAD</label>
              <input type="text" required placeholder="Ali Yılmaz"
                value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})}
                className="w-full px-4 py-3.5 bg-surface/50 border border-transparent rounded-xl text-[14px] focus:outline-none focus:border-divider focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-[12px] md:text-[13px] font-bold tracking-wider text-secondary uppercase mb-2">E-POSTA</label>
              <input type="email" required placeholder="ornek@gmail.com"
                value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3.5 bg-surface/50 border border-transparent rounded-xl text-[14px] focus:outline-none focus:border-divider focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-[12px] md:text-[13px] font-bold tracking-wider text-secondary uppercase mb-2">ŞİFRE</label>
              <input type="password" required placeholder="••••••••"
                value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})}
                className="w-full px-4 py-3.5 bg-surface/50 border border-transparent rounded-xl text-[14px] focus:outline-none focus:border-divider focus:bg-white"
              />
            </div>

            <button type="submit" className="w-full py-4 bg-primary hover:bg-primary/90 text-white font-medium text-[16px] rounded-xl shadow-lg hover:-translate-y-0.5 transition-all">
              Kayıt Ol →
            </button>
          </form>

          <footer className="text-center mt-8 text-[14px] text-secondary/80">
            Zaten hesabın var mı? <button onClick={() => navigate('/')} className="font-bold text-primary hover:underline">Giriş yap</button>
          </footer>
        </main>
      </div>
    </div>
  );
}