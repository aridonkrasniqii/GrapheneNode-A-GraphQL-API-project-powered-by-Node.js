import { IOrder } from '../interfaces/IOrder';
import { Order } from '../models/Order';
import { BaseRepository } from '../repository/BaseRepository';

export class OrderService {
  constructor(private orderRepository: BaseRepository<Order>) {}

  getAllOrders = async (): Promise<IOrder[]> => {
    return this.orderRepository.getAllEntities();
  };
  getOrderById = async (order_id: number): Promise<IOrder> => {
    return this.orderRepository.getEntityById(order_id);
  };

  createOrder = async (user_id: number, comments: string, order_date: Date) => {
    const order = new Order(user_id, comments, order_date);
    return this.orderRepository.createEntity(order);
  };

  updateOrder = async (
    order_id: number,
    user_id: number,
    comments: string,
    order_date: Date
  ): Promise<IOrder> => {
    const order = new Order(user_id, comments, order_date);
    return this.orderRepository.updateEntity(order_id, order);
  };

  deleteOrder = async (order_id: number): Promise<IOrder> => {
    return this.orderRepository.deleteEntity(order_id);
  };
}
