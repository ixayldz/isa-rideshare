# Rideshare Backend

Bu proje, kullanıcıların araç paylaşım seyahatleri düzenleyebileceği ve katılabileceği bir rideshare (araç paylaşım) platformunun backend kısmını oluşturur. Kullanıcılar seyahat oluşturabilir, rezervasyon yapabilir, mesajlaşabilir ve daha fazlasını yapabilirler.

## Özellikler

- **Kullanıcı Kayıt ve Giriş:**
  - Kullanıcılar kayıt olabilir ve giriş yapabilir.
  - Kullanıcı bilgilerini güncelleyebilir ve şifrelerini değiştirebilirler.

- **Seyahat Yönetimi:**
  - Kullanıcılar seyahat oluşturabilir, güncelleyebilir ve silebilir.
  - Tüm seyahatleri listeleyebilir ve belirli seyahatleri görüntüleyebilirler.
  - Seyahatleri arayabilir ve filtreleyebilirler.

- **Rezervasyon Sistemi:**
  - Kullanıcılar seyahatlere rezervasyon yapabilir ve iptal edebilir.
  - Rezervasyon yapıldığında sürücüye bildirim gönderilir.

- **Mesajlaşma Sistemi:**
  - Kullanıcılar birbirlerine mesaj gönderebilir ve alabilir.
  - Mesajlar gerçek zamanlı olarak iletilebilir.

- **Bildirim Sistemi:**
  - Rezervasyon yapıldığında veya iptal edildiğinde bildirim gönderilir.
  - Bildirimler kullanıcı tarafından görüntülenebilir ve okundu olarak işaretlenebilir.

- **Favori Rotalar:**
  - Kullanıcılar favori rotalarını kaydedebilir ve yönetebilir.

- **Bildirim Tercihleri:**
  - Kullanıcılar bildirim tercihlerini ayarlayabilir (e-posta, SMS, push bildirimleri).

## Kurulum

### Gereksinimler

- Node.js
- MongoDB
- Heroku CLI (deploy için)

### Adımlar

1. **Depoyu Klonlayın:**

    ```bash
    git clone https://github.com/username/your-repo-name.git
    cd your-repo-name
    ```

2. **Bağımlılıkları Yükleyin:**

    ```bash
    npm install
    ```

3. **Ortam Değişkenlerini Ayarlayın:**

   Proje kök dizininde bir `.env` dosyası oluşturun ve aşağıdaki değişkenleri ekleyin:

    ```plaintext
    MONGO_URI=your_mongo_uri
    JWT_SECRET=your_jwt_secret
    EMAIL_USER=your_email
    EMAIL_PASS=your_email_password
    ```

4. **Sunucuyu Başlatın:**

    ```bash
    npm run dev
    ```

    Sunucu, `http://localhost:3000` adresinde çalışacaktır.

## API Dökümantasyonu

API uç noktaları ve kullanım detayları için [API Dökümantasyonu](./docs.html) sayfasına göz atabilirsiniz.

## Katkıda Bulunma

1. Bu repoyu forklayın.
2. Yeni bir dal (branch) oluşturun: `git checkout -b feature-name`.
3. Değişikliklerinizi commit edin: `git commit -m 'Add some feature'`.
4. Dalınızı itekleyin: `git push origin feature-name`.
5. Bir Pull Request açın.

## Lisans

Bu proje [MIT Lisansı](./LICENSE) ile lisanslanmıştır.

