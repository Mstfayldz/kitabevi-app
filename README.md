# Page Nest - Dijital Kitap Evi

Page Nest, kullanıcıların kitap keşfedebildiği, favorilerine ekleyebildiği, kendi kitap ilanlarını oluşturup yönetebildiği ve gelişmiş sepet işlemleri yapabildiği modern bir C2C (Kullanıcıdan Kullanıcıya) dijital kitap pazaryeri projesidir. Tasarım süreci Figma ile kurgulanmış, geliştirme aşamasında ise modern React mimarisi ve Tailwind CSS kullanılmıştır.

---

## Kullanılan Teknolojiler ve Araçlar

- **Tasarım & Prototipleme:** Figma
- **Frontend Kütüphanesi:** React.js (Vite ile modern ve hızlı derleme mimarisi)
- **Yönlendirme (Routing):** React Router DOM (v6)
- **Stilleme & UI:** Tailwind CSS (v4)
- **Veri & Durum Yönetimi (State & Storage):** Tarayıcı LocalStorage API (Gelişmiş Oturum İzolasyonu ve Self-Healing mekanizmaları ile)
- **İkonografi:** Modern ve hafif SVG favicon / Native Emoji entegrasyonu

---

## Temel Mühendislik ve Tasarım Özellikleri

- **Kullanıcı Oturum İzolasyonu (Session Isolation):** Sistem, her kullanıcının sepet ve favori verilerini benzersiz e-posta adresine tanımlı özel anahtarlarla (`cart_email` ve `favorites_email`) yönetir. Farklı hesapların verileri asla birbirine karışmaz.
- **Gelişmiş Veri Senkronizasyonu & Kendi Kendini Onarma (Self-Healing Data):** Global vitrinden silinen bir kitap, tüm kullanıcıların izole sepet ve favori listelerinden eş zamanlı ve otomatik olarak temizlenir. Hayalet verilerin (Ghost Data) oluşması engellenir.
- **Dinamik Filtreleme & Arama:** Kullanıcılar vitrindekileri kategoriye (Roman, Bilim Kurgu, Fantastik, Tarih vb.), yazar adına ve kitap başlığına göre anlık ve gecikmesiz olarak süzebilir.
- **Tam CRUD Yeteneği:** Kullanıcılar kendi profilleri üzerinden sisteme yeni kitap ilanı ekleyebilir (Create), mevcut ilanlarını güncelleyebilir (Update) ve ilanlarını silebilir (Delete).
- **Temiz Kod (Clean Code) ve Modüler Mimari:** Tekrar eden bileşenler (`BookCard.jsx`) ve veri şablonları (`BookSchema.js`) ayrılarak mimari sürdürülebilirlik sağlanmıştır.

---

## Kullanıcı Akışı (User Flow)

Page Nest, kullanıcılarına pürüzsüz ve mantıklı bir alışveriş deneyimi akışı sunar:

1. **Kayıt ve Giriş (Onboarding & Auth Flow):**
   - Kullanıcı sisteme ad, soyad, e-posta ve şifre ile kayıt olur.
   - Giriş yapıldığında sistem kimliği doğrular ve kişiye özel izole bir veri kanalı açarak kullanıcıyı **Keşfet (Ana Sayfa)** ekranına yönlendirir.

2. **Keşfetme ve İnceleme (Discovery & Inspection Flow):**
   - Kullanıcı ana sayfada "En Çok Tercih Edilenler" bölümünde öne çıkan kitapları yatay bir kaydırma (carousel) deneyimiyle inceler.
   - Arama çubuğu veya kategori haplarıyla ilgilendiği kitapları listeler.
   - "İncele" butonuna tıklandığında açılan detay sayfasında (`BookDetail`) kitabın geniş özetini, yazarını, basım yılını ve ekleyen satıcının bilgisini görüntüleyip aksiyon alabilir.

3. **Etkileşim ve Alışveriş Akışı (Action & Checkout Flow):**
   - Kullanıcılar kitapları tek tıkla favorilerine ekleyebilir veya doğrudan sepetine atabilir.
   - **Sepetim (`Cart`) Sayfası:** Kullanıcı anlık güncellenen toplam tutarı görür, vazgeçtiği kitapları "Sil" butonuyla bireysel olarak sepetten çıkarabilir veya "Sepeti Temizle" seçeneğiyle tüm sepeti sıfırlayabilir.
   - **Favorilerim (`Favorites`) Sayfası:** Beğenilen kitaplar burada filtrelenir; kullanıcı buradan tek tıkla ürünü sepete aktarabilir veya favorilerinden çıkarabilir.

4. **Satıcı ve Profil Akışı (Profile & CRUD Flow):**
   - Kullanıcı sağ üstteki profil ikonu üzerinden "Profil Paneli"ne erişir.
   - Panel üzerinden sisteme satmak istediği yeni bir kitabı ekler.
   - Eklediği kitaplar anında hem kendi panelinde ("İlanlarım") hem de global **Keşfet** vitrininde yayınlanır.
   - İlanında bir değişiklik yapmak isterse **Düzenle** butonuna basarak form üzerinden fiyat, başlık veya kategori güncelleyebilir ya da ilanı sistemden tamamen kaldırabilir.
   - İşlemleri bittiğinde güvenli bir şekilde **Çıkış Yap** diyerek oturumunu sonlandırır.

---

## Proje Kurulumu ve Çalıştırılması

Projeyi yerel bilgisayarınızda (localhost) çalıştırmak için aşağıdaki adımları sırasıyla izleyebilirsiniz:

1. Repoyu klonlayın:
   git clone <repo-url>

2. Proje klasörüne girin:
   cd pagenest

3. Gerekli bağımlılıkları yükleyin:
   npm install

4. Geliştirme sunucusunu başlatın:
   npm run dev

_(Not: Proje ilk kez çalıştırıldığında, derlenmiş mimari gereği tarayıcı hafızası otomatik olarak optimize edilir ve varsayılan zengin kitap kataloğu oluşturulur.)_
