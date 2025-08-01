import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import orderRoutes from './routes/OrderRoutes';
import connectDB from './config/db';  // dosya yolunu kendine göre ayarla
import { Server } from 'socket.io';
import http from 'http';

dotenv.config();

connectDB();  // burada veritabanı bağlantısını başlat

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});const PORT = process.env.PORT || 5000;

app.set('io', io); // io'yu request'te kullanmak için

app.use(express.json());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API Routes
app.use('/api', orderRoutes);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});

