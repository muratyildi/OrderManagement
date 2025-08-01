Bu proje, Express.js, TypeScript, MongoDB, Socket.IO ve MQTT kullanılarak geliştirilmiş basit bir sipariş yönetim sistemidir.

Özellikler
RESTful API: Sipariş oluşturma, listeleme, güncelleme ve silme

Gerçek zamanlı bildirimler: Socket.IO ile WebSocket üzerinden

MQTT: Sipariş durumu güncellemeleri

Swagger: Otomatik API dokümantasyonu

🛠️ Gereksinimler
Aşağıdaki yazılımlar sisteminizde kurulu olmalıdır:

Docker

Docker Compose

Git (opsiyonel)

Node.js (sadece yerel çalıştırma için)

📥 Kurulum
1. Projeyi Klonlayın
bash
git clone https://github.com/kullaniciAdi/OrderManagement.git
cd OrderManagement
2. Bağımlılıkları Yükleyin (Docker kullanmıyorsanız)
bash
npm install
⚠️ Bu komut package.json dosyasının bulunduğu dizinde çalıştırılmalıdır.

🐳 Docker ile Çalıştırma
Proje, docker-compose.yml ile birlikte gelir. MongoDB, Backend ve MQTT broker container olarak ayağa kalkar.

docker compose up -d --build
not: eğer ports are not available gibi bir hata alırsanız,docker containerlarınızda 5000 portunu kullanan bir servis olabilir.
Lütfen docker compose yml dosyasında portu güncelleyin(soldaki portu değiştirmeniz yeterli).

Servisler çalıştıktan sonra:
🔹 Swagger UI: http://localhost:5000/api-docs

🔹 Backend API: http://localhost:5000

🔹 MQTT Broker: mqtt://localhost:1883

📡 MQTT & Socket.IO Kullanımı
Not: Bu projede bir frontend arayüzü bulunmamaktadır.

Aşağıdaki yollarla MQTT ve Socket.IO özelliklerini test edebilirsiniz:

✅ MQTT Durum Mesajı Yayınlama
bash

mosquitto_pub -h localhost -p 1883 -t orders/<orderId>/status -m "delivered"
✅ Socket.IO Dinleme
bash
npx ts-node src/sockets/socket-client.ts
✅ MQTT Subscriber Script’i
bash

npx ts-node src/mqtt/mqtt-subscriber.ts
Yukarıdaki komutlar için TypeScript desteği (ts-node) kurulu olmalıdır.

⚙️ Docker Yapılandırması
bash

OrderManagement/
├── Dockerfile
├── docker-compose.yml
├── .env
├── src/
│   └── ...
Eğer Dockerfile alt bir dizinde yer alıyorsa (backend/ gibi), docker-compose.yml içindeki build.context ayarını buna göre güncelleyin.

🔐 Ortam Değişkenleri
Docker Compose kullanıyorsanız .env dosyasına gerek yoktur çünkü değişkenler gömülüdür:

ini

MONGO_URI=mongodb://mongo:27017/orderDB
MQTT_BROKER_URL=mqtt://mosquitto:1883
Eğer Docker olmadan çalıştırıyorsanız, bir .env dosyası oluşturun ve aynı değişkenleri girin.

📬 API Uç Noktaları
Yöntem	Endpoint	Açıklama
POST	/api/orders	Yeni sipariş oluştur
GET	/api/orders	Tüm siparişleri getir (filtrelenebilir)
GET	/api/orders/:id	Siparişi ID’ye göre getir
PUT	/api/orders/:id	Siparişi güncelle
DELETE	/api/orders/:id	Siparişi sil

🔍 Detaylı test ve kullanım için: Swagger UI

📚 Kullanılan Teknolojiler
Express.js

MongoDB + Mongoose

Socket.IO

MQTT.js

Swagger UI Express

TypeScript

ts-node-dev