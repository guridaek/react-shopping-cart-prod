import { rest } from "msw";
import products from "./data/products.json";
import coupons from "./data/coupons.json";
import { getCart, addCartItem, setCartItem } from "mocks/server/cart";
import { getOrders, postOrder } from "./server/orders";

export const handlers = [
  rest.get("msw/products", (req, res, ctx) => {
    return res(
      ctx.delay(500),
      ctx.status(200),
      ctx.set("Content-Type", "application/json"),
      ctx.json(products)
    );
  }),

  rest.get("msw/cart-items", (req, res, ctx) => {
    return res(
      ctx.delay(200),
      ctx.status(200),
      ctx.set("Content-Type", "application/json"),
      ctx.json(getCart())
    );
  }),

  rest.post("msw/cart-items", async (req, res, ctx) => {
    const { productId } = await req.json();

    const cartItemId = addCartItem(productId);

    return res(ctx.delay(100), ctx.status(201), ctx.set("Location", `/cart-items/${cartItemId}`));
  }),

  rest.patch("msw/cart-items/:cartItemId", async (req, res, ctx) => {
    const { cartItemId } = req.params;
    const { quantity } = await req.json();

    setCartItem(Number(cartItemId), quantity);

    return res(ctx.delay(100), ctx.status(200));
  }),

  rest.delete("msw/cart-items/:cartItemId", async (req, res, ctx) => {
    const { cartItemId } = req.params;

    setCartItem(Number(cartItemId), 0);

    return res(ctx.delay(100), ctx.status(204));
  }),

  rest.get("msw/coupons", (req, res, ctx) => {
    return res(
      ctx.delay(500),
      ctx.status(200),
      ctx.set("Content-Type", "application/json"),
      ctx.json(coupons)
    );
  }),

  rest.get("msw/orders", (req, res, ctx) => {
    return res(
      ctx.delay(400),
      ctx.status(200),
      ctx.set("Content-Type", "application/json"),
      ctx.json(getOrders())
    );
  }),

  rest.post("msw/orders", async (req, res, ctx) => {
    const orderItems = await req.json();

    postOrder(orderItems);

    return res(ctx.delay(200), ctx.status(204));
  }),
];
