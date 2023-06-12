import { CartItem } from "api/cartItems";
import products from "mocks/data/products.json";

const CART_LOCAL_STORAGE_KEY = "cart";

export const getCart = (): CartItem[] => {
  try {
    const item = localStorage.getItem(CART_LOCAL_STORAGE_KEY);

    return item ? JSON.parse(item) : [];
  } catch {
    return [];
  }
};

export const addCartItem = (id: number) => {
  const cart = getCart();
  const product = products.find((value) => value.id === id);

  if (!product) return;

  const cartItemId = Date.now();

  cart.push({ id: cartItemId, quantity: 1, product: product });

  localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify(cart));

  return cartItemId;
};

export const setCartItem = (id: number, quantity: number) => {
  const cart = getCart();
  const itemIndex = cart.findIndex((item) => item.id === id);

  if (itemIndex === -1) return;

  if (quantity > 0) cart[itemIndex] = { ...cart[itemIndex], quantity: quantity };
  if (quantity === 0) cart.splice(itemIndex, 1);

  localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify(cart));
};

export const clearCart = () => {
  localStorage.removeItem(CART_LOCAL_STORAGE_KEY);
};
