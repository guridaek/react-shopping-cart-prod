import { ServerId } from "recoil/server";
import { Product } from "./products";
import { CART_ERROR_MESSAGE, SERVER_LIST } from "constants/api";

export interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}

export const getCartItems = async (serverId: ServerId): Promise<CartItem[]> => {
  const response = await fetch(`${SERVER_LIST[serverId]}/cart-items`, {
    method: "GET",
    headers: {
      Authorization: `Basic ${process.env.REACT_APP_USER_TOKEN}`,
    },
  });

  const data = await response.json();

  if (!response.ok || !data.length) throw new Error(CART_ERROR_MESSAGE.GET);

  return data;
};

export const addCartItem = async (serverId: ServerId, productId: number) => {
  const response = await fetch(`${SERVER_LIST[serverId]}/cart-items`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${process.env.REACT_APP_USER_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId: productId }),
  });

  const cartItemId = response.headers.get("Location")?.split("/")[2];

  if (!response.ok || !cartItemId)
    throw new Error(
      response.status.toString()[0] === "5"
        ? CART_ERROR_MESSAGE.POST.SERVER
        : CART_ERROR_MESSAGE.POST.CLIENT
    );

  return cartItemId;
};

export const changeItemQuantity = async (
  serverId: ServerId,
  cartItemId: number,
  quantity: number
) => {
  const response = await fetch(`${SERVER_LIST[serverId]}/cart-items/${cartItemId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Basic ${process.env.REACT_APP_USER_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quantity: quantity }),
  });

  if (!response.ok)
    throw new Error(
      response.status.toString()[0] === "5"
        ? CART_ERROR_MESSAGE.PATCH.SERVER
        : CART_ERROR_MESSAGE.POST.CLIENT
    );
};

export const removeCartItem = async (serverId: ServerId, cartItemId: number) => {
  const response = await fetch(`${SERVER_LIST[serverId]}/cart-items/${cartItemId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Basic ${process.env.REACT_APP_USER_TOKEN}`,
    },
  });

  if (!response.ok)
    throw new Error(
      response.status.toString()[0] === "5"
        ? CART_ERROR_MESSAGE.DELETE.SERVER
        : CART_ERROR_MESSAGE.DELETE.CLIENT
    );
};
