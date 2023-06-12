import { ServerId } from "recoil/server";
import { SERVER_LIST } from "./constants";
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

  const data = await response.json();

  if (!response.ok)
    throw new Error(data.message ?? "오류가 발생했습니다. 잠시 후 다시 시도해주세요.");

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

  return response.ok;
};
