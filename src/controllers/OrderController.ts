import { Request, Response } from 'express';
import Order from '../models/Order';
import mqttClient from '../mqtt/mqttClient';

// controllers/OrderController.ts içinde
export const createOrder = async (req: Request, res: Response) => {
  try {
    const newOrder = await Order.create(req.body);
    const io = req.app.get('io');
    io.emit('new_order', newOrder);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: 'Order creation failed', error });
  }
};


export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { status, startDate, endDate } = req.query;

    const filter: any = {};

    if (status) filter.status = status;
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate as string);
      if (endDate) filter.createdAt.$lte = new Date(endDate as string);
    }

    const orders = await Order.find(filter);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders', error });
  }
};


export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const updated = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: 'Order not found' });

    // MQTT üzerinden sipariş durumu güncellemesini yayınla
    mqttClient.publish(`orders/${updated._id}/status`, updated.status);

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Order update failed', error });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Order not found' });

    res.status(200).json({ message: 'Order deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Order delete failed', error });
  }
};
