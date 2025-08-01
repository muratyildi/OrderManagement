import mongoose, { Schema, Document } from 'mongoose';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface IOrder extends Document {
  orderNumber: string;
  customerName: string;
  items: OrderItem[];
  status: 'pending' | 'processing' | 'completed';
  total: number;
  createdAt: Date;
}

const OrderItemSchema: Schema = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const OrderSchema: Schema = new Schema<IOrder>({
  orderNumber: { type: String, required: true, unique: true },
  customerName: { type: String, required: true },
  items: { type: [OrderItemSchema], required: true },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed'],
    default: 'pending',
  },
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
