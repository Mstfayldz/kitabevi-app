import React from 'react';

export default function Login() {
  return (
    <div className="min-h-screen bg-base font-inter text-secondary flex flex-col justify-between antialiased">
      
      {/* Üst Header Alanı (Figma: Koyu Kahve Banner & Kavisli Yapı) */}
      <header className="bg-secondary text-base pt-14 pb-8 rounded-b-[40px] flex flex-col items-center justify-center shadow-md">
        {/* Logo Alanı */}
        <div className="bg-base p-2 rounded-xl mb-2 shadow-inner flex items-center justify-center">
          <span className="text-secondary font-bold text-xl font-playfair">📄</span>
        </div>
        <h1 className="font-playfair text-3xl font-bold tracking-wide">
          Page <span className="text-primary">Nest</span>
        </h1>
        <p className="text-xs tracking-[0.2em] uppercase mt-1 opacity-90">
          KİTAP DÜNYASI
        </p>
      </header>

      {/* Form ve Karşılama Alanı (Figma Mobil Grid: 24px margin) */}
      <main className="flex-1 flex flex-col justify-center px-mobile-margin py-8 max-w-md mx-auto w-full">
        
        {/* Başlık Hiyerarşisi */}
        <div className="mb-8">
          <h2 className="font-playfair text-[24px] font-bold text-secondary mb-1">
            Tekrar Hoş geldin
          </h2>
          <p className="font-inter text-[16px] text-divider">
            Hesabına giriş yap
          </p>
        </div>

        {/* Veri iletim güvenliği için POST kullanan Form yapısı */}
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()} method="POST">
          
          {/* E-Posta Input Alanı */}
          <div>
            <label htmlFor="email" className="block font-inter text-[12px] font-bold tracking-wider text-secondary uppercase mb-2">
              E-POSTA
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="ornek@gmail.com"
              required
              className="w-full px-4 py-3.5 bg-surface border border-transparent rounded-xl font-inter text-[14px] text-secondary placeholder-secondary/40 focus:outline-none focus:border-divider transition-all"
            />
          </div>

          {/* Şifre Input Alanı */}
          <div>
            <label htmlFor="password" className="block font-inter text-[12px] font-bold tracking-wider text-secondary uppercase mb-2">
              ŞİFRE
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                required
                className="w-full px-4 py-3.5 bg-surface border border-transparent rounded-xl font-inter text-[14px] text-secondary placeholder-secondary/40 focus:outline-none focus:border-divider transition-all"
              />
              {/* Figma'daki Göz İkonu */}
              <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary/60 text-sm hover:text-secondary transition-colors">
                👁️
              </button>
            </div>
          </div>

          {/* Şifremi Unuttum Bağlantısı */}
          <div className="text-center pt-2">
            <button type="button" className="font-inter text-[14px] text-secondary/80 hover:text-secondary font-medium transition-colors">
              Şifremi unuttum
            </button>
          </div>

          {/* "veya" Divider Çizgisi */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-divider/20"></div>
            <span className="flex-shrink mx-4 font-inter text-[14px] text-divider/60">veya</span>
            <div className="flex-grow border-t border-divider/20"></div>
          </div>

          {/* Giriş Yap CTA Butonu (%10 Vurgu - Toprak Kırmızı) */}
          <button
            type="submit"
            className="w-full py-4 bg-primary hover:bg-primary/95 text-white font-inter font-medium text-[16px] rounded-xl shadow-md active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            Giriş Yap <span className="text-lg">→</span>
          </button>
          
        </form>
      </main>

      {/* Alt Altlık (Footer) Bölümü */}
      <footer className="text-center py-6 font-inter text-[14px] text-secondary/80">
        Hesabın yok mu?{' '}
        <button type="button" className="font-bold text-primary hover:underline transition-all">
          Kayıt ol
        </button>
      </footer>
      
    </div>
  );
}