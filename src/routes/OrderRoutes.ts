import { Router } from 'express';
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder
} from '../controllers/OrderController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Sipariş yönetimi
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Yeni sipariş oluştur
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Sipariş başarıyla oluşturuldu
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       500:
 *         description: Sipariş oluşturulamadı
 */
router.post('/orders', createOrder);

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Tüm siparişleri getir
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Sipariş listesi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       500:
 *         description: Siparişler getirilemedi
 */
router.get('/orders', getAllOrders);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Siparişi ID'ye göre getir
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Sipariş ID
 *     responses:
 *       200:
 *         description: Sipariş bulundu
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Sipariş bulunamadı
 */
router.get('/orders/:id', getOrderById);

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Siparişi güncelle
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Güncellenecek siparişin ID'si
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: Sipariş güncellendi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Sipariş bulunamadı
 */
router.put('/orders/:id', updateOrder);

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Siparişi sil
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Silinecek siparişin ID'si
 *     responses:
 *       200:
 *         description: Sipariş silindi
 *       404:
 *         description: Sipariş bulunamadı
 */
router.delete('/orders/:id', deleteOrder);

export default router;
