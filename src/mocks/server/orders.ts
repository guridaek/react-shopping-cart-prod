import { PostOrder, Order } from "api/orders";
import { clearCart } from "./cart";

const ORDERS_LOCAL_STORAGE_KEY = "orders";

export const getOrders = (): Order[] => {
  try {
    const item = localStorage.getItem(ORDERS_LOCAL_STORAGE_KEY);

    return item ? JSON.parse(item) : [];
  } catch {
    return [];
  }
};

export const postOrder = (order: PostOrder) => {
  const orderList = getOrders();

  const newOrder: Order = {
    deliveryFee: order.deliveryFee,
    orderId: Date.now(),
    orderItems: order.orderItems.map((item) => {
      const price = item.product.price * item.quantity;

      if (item.coupons.length < 1) return { ...item, total: price };

      const coupon = item.coupons[0];
      const amount = coupon.discount.amount;

      if (coupon.discount.type === "price")
        return { ...item, total: price < amount ? 0 : price - amount };

      return { ...item, total: Math.floor(price * ((100 - amount) / 100)) };
    }),
    total: 0,
  };

  newOrder.total = newOrder.orderItems.reduce((sum, item) => sum + item.total, 0);

  orderList.push(newOrder);
  localStorage.setItem(ORDERS_LOCAL_STORAGE_KEY, JSON.stringify(orderList));

  clearCart();
};
