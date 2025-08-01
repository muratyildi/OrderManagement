# OrderManagement/Dockerfile

FROM node:18-alpine

# Çalışma dizini olarak app klasörü oluştur
WORKDIR /app

# package.json ve package-lock.json kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install

# Tüm proje dosyalarını kopyala
COPY . .

# TypeScript kodlarını derle (src -> dist)
RUN npm run build

# Uygulamanın dinleyeceği port
EXPOSE 5000

# Uygulama başlat
CMD ["node", "dist/index.js"]
