
Order Management Backend
Bu proje, Express.js, TypeScript, MongoDB, Socket.IO, ve MQTT kullanılarak geliştirilmiş basit bir sipariş yönetim sistemidir.

🔧 Özellikler
REST API: Sipariş oluşturma, listeleme, güncelleme ve silme.

Gerçek zamanlı bildirim: Socket.IO ile WebSocket üzerinden.

MQTT ile durum güncellemeleri.

Swagger ile API dokümantasyonu.

🚀 Kurulum ve Çalıştırma
1. Gereksinimler
Aşağıdaki yazılımların sisteminizde kurulu olması gerekir:

Docker ve Docker Compose

Git (opsiyonel)

2. Projeyi Klonlayın
git clone https://github.com/kullaniciAdi/OrderManagement.git
cd OrderManagement
3. Gerekli Paketlerin Kurulumu
İlk kez çalıştırmadan önce aşağıdaki komutla bağımlılıkları kurun:

npm install
⚠️ Bu komut package.json dosyasının bulunduğu klasörde çalıştırılmalıdır.

🐳 Docker ile Projeyi Başlatma
Proje, MongoDB, Backend ve MQTT broker içeren bir docker-compose.yml ile birlikte gelir.

docker-compose up --build
Tüm servisler ayağa kalktığında:

Swagger UI: http://localhost:5000/api-docs

MQTT Broker: mqtt://localhost:1883

Backend API: http://localhost:5000

📡 MQTT & Socket.IO Hakkında
Bu projede herhangi bir frontend arayüzü yoktur.

MQTT ve Socket.IO özelliklerini test etmek isteyen geliştiriciler için örnek terminal betikleri ya da Postman/Insomnia kullanılabilir.

MQTT Mesajı Yayınlama Örneği:
mosquitto_pub -h localhost -p 1883 -t orders/<orderId>/status -m "delivered"
Socket.IO Dinleme Örneği:
npx ts-node src/sockets/socket-client.ts
ile dinleyebilirsiniz

MQTT için;npx ts-node src/mqtt/mqtt-subscriber.ts
📂 Dockerfile Konumu
Dockerfile dosyanı
OrderManagement/
├── Dockerfile
├── docker-compose.yml
├── src/
│   └── ...
Eğer Dockerfile alt bir dizinde ise (örneğin backend/), docker-compose.yml içinde context ayarını buna göre değiştirmeniz gerekir.

🔐 Ortam Değişkenleri
docker-compose.yml dosyasına gömülü ortam değişkenleri:


MONGO_URI=mongodb://mongo:27017/orderDB
MQTT_BROKER_URL=mqtt://mosquitto:1883
Eğer projeyi Docker olmadan çalıştıracaksanız, .env dosyası oluşturup bu değişkenleri ekleyin.

📬 API Uç Noktaları
POST /api/orders → Sipariş oluştur

GET /api/orders → Tüm siparişleri getir

GET /api/orders/:id → ID’ye göre getir

PUT /api/orders/:id → Güncelle

DELETE /api/orders/:id → Sil

Swagger üzerinden detaylı test edebilirsiniz.

📦 Kullanılan Başlıca Paketler
express

mongoose

socket.io

mqtt

swagger-ui-express

typescript, ts-node-dev

