import { ServerId } from "recoil/server";
import { ORDER_ERROR_MESSAGE, SERVER_LIST } from "constants/api";
import { Product } from "./products";
import { Coupon } from "./coupons";
import { CartItem } from "./cartItems";

export interface Order {
  orderId: number;
  deliveryFee: number;
  total: number;
  orderItems: OrderItem[];
}

export interface OrderItem {
  id: number;
  product: Product;
  coupons: Coupon[];
  total: number;
  quantity: number;
}

export interface PostOrderItem extends CartItem {
  coupons: Coupon[];
}

export interface PostOrder {
  deliveryFee: number;
  orderItems: PostOrderItem[];
}

export const getOrders = async (serverId: ServerId): Promise<Order[]> => {
  const response = await fetch(`${SERVER_LIST[serverId]}/orders`, {
    method: "GET",
    headers: {
      Authorization: `Basic ${process.env.REACT_APP_USER_TOKEN}`,
    },
  });

  if (!response.ok) throw new Error(ORDER_ERROR_MESSAGE.GET);

  const data = await response.json().catch(() => {
    throw new Error(ORDER_ERROR_MESSAGE.GET);
  });

  return data;
};

export const postOrder = async (serverId: ServerId, order: PostOrder) => {
  const response = await fetch(`${SERVER_LIST[serverId]}/orders`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${process.env.REACT_APP_USER_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });

  if (!response.ok)
    throw new Error(
      response.status.toString()[0] === "5"
        ? ORDER_ERROR_MESSAGE.POST.SERVER
        : ORDER_ERROR_MESSAGE.POST.CLIENT
    );
};
