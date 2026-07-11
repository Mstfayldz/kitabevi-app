import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // kullanıcıyı bul
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      // aktif kullanıcıyı kaydet ve ana sayfaya at
      localStorage.setItem('currentUser', JSON.stringify(user));
      navigate('/home');
    } else {
      alert('Hatalı e-posta veya şifre! Kayıtlı değilsen önce kayıt olmalısın.');
    }
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
          <p className="text-xs md:text-sm tracking-[0.3em] uppercase mt-2 opacity-90 text-center">KİTAP DÜNYASI</p>
        </header>

        <main className="flex-1 flex flex-col justify-center px-6 py-8 md:p-12 md:w-1/2 bg-base md:bg-transparent">
          <div className="mb-8 text-center md:text-left">
            <h2 className="font-playfair text-[24px] md:text-[32px] font-bold text-secondary mb-2">Tekrar Hoş geldin</h2>
            <p className="font-inter text-[16px] text-divider">Hesabına giriş yap</p>
          </div>

          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="block text-[12px] font-bold tracking-wider text-secondary uppercase mb-2">E-POSTA</label>
              <input type="email" required placeholder="ornek@gmail.com"
                value={email} onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3.5 bg-surface/50 border border-transparent rounded-xl text-[14px] focus:outline-none focus:border-divider focus:bg-white"
              />
            </div>
            
            <div>
              <label className="block text-[12px] font-bold tracking-wider text-secondary uppercase mb-2">ŞİFRE</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} required placeholder="••••••••"
                  value={password} onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-3.5 bg-surface/50 border border-transparent rounded-xl text-[14px] focus:outline-none focus:border-divider focus:bg-white"
                />
                {/* Şık SVG Göz İkonu */}
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary/50 hover:text-secondary">
                  <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" className="w-5 h-5">
                    {showPassword ? (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            <button type="submit" className="w-full py-4 bg-primary hover:bg-primary/90 text-white font-medium text-[16px] rounded-xl shadow-lg mt-6 transition-all">
              Giriş Yap →
            </button>
          </form>

          <footer className="text-center mt-8 text-[14px] text-secondary/80">
            Hesabın yok mu? <button onClick={() => navigate('/register')} className="font-bold text-primary hover:underline">Kayıt ol</button>
          </footer>
        </main>
      </div>
    </div>
  );
}