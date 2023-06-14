import type { Preview } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import GlobalStyle from "../src/style/GlobalStyle";
import { RecoilRoot } from "recoil";
import { initializeWorker, mswDecorator } from "msw-storybook-addon";
import { rest } from "msw";
import products from "../src/mocks/data/products.json";
import coupons from "../src/mocks/data/coupons.json";

initializeWorker();

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    msw: {
      handlers: [
        rest.get("*/products", (req, res, ctx) => res(ctx.status(200), ctx.json(products))),
        rest.get("*/cart-items", (req, res, ctx) =>
          res(
            ctx.status(200),
            ctx.json([
              {
                id: 1,
                quantity: 2,
                product: {
                  id: 1,
                  name: "친환경미니탕용기 158 중 (EL)",
                  price: 65500,
                  imageUrl:
                    "https://cdn-mart.baemin.com/goods/46/D139-RM-60367_%EC%86%8C%EB%9F%89_%EB%AF%B8%EB%8B%88%ED%83%95%EC%9A%A9%EA%B8%B0_EL_158_%EC%A4%91_%EC%8D%B8%EB%84%A4%EC%9D%BC.jpg?h=700&w=700",
                },
              },
              {
                id: 2,
                quantity: 3,
                product: {
                  id: 2,
                  name: "친환경국용기 중 (EL/백색)",
                  price: 72400,
                  imageUrl:
                    "https://cdn-mart.baemin.com/goods/61/D139-RM-22941_%E1%84%80%E1%85%AE%E1%86%A8%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%80%E1%85%B5(EL_%E1%84%8C%E1%85%AE%E1%86%BC_%E1%84%87%E1%85%A2%E1%86%A8%E1%84%89%E1%85%A2%E1%86%A8)_%E1%84%86%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AB_%E1%84%8A%E1%85%A5%E1%86%B7%E1%84%82%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AF.jpg?h=700&w=700",
                },
              },
            ])
          )
        ),
        rest.get("*/coupons", (req, res, ctx) => res(ctx.status(200), ctx.json(coupons))),
        rest.post("*/cart-items", async (req, res, ctx) =>
          res(ctx.delay(100), ctx.status(201), ctx.set("Location", `/cart-items/${Date.now()}`))
        ),
        rest.patch("*/cart-items/:cartItemId", async (req, res, ctx) => res(ctx.status(200))),
        rest.delete("*/cart-items/:cartItemId", async (req, res, ctx) => res(ctx.status(204))),
        rest.get("*/orders", (req, res, ctx) =>
          res(
            ctx.status(200),
            ctx.set("Content-Type", "application/json"),
            ctx.json([
              {
                orderId: 1,
                deliveryFee: 3000,
                total: 234000,
                orderItems: [
                  {
                    orderItemId: 1,
                    product: {
                      id: 1,
                      name: "치킨",
                      price: 10000,
                      imageUrl:
                        "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
                    },
                    total: 8000,
                    quantity: 1,
                    coupons: [
                      {
                        couponId: 1,
                        name: "쿠폰 이름",
                        discount: {
                          type: "price",
                          amount: 2000,
                        },
                      },
                    ],
                  },
                  {
                    orderItemId: 2,
                    product: {
                      id: 2,
                      name: "샐러드",
                      price: 20000,
                      imageUrl:
                        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
                    },
                    total: 200000,
                    quantity: 10,
                    coupons: [],
                  },
                  {
                    orderItemId: 3,
                    product: {
                      id: 3,
                      name: "피자",
                      price: 13000,
                      imageUrl:
                        "https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
                    },
                    total: 26000,
                    quantity: 2,
                    coupons: [],
                  },
                ],
              },
              {
                orderId: 2,
                deliveryFee: 3000,
                total: 62000,
                orderItems: [
                  {
                    orderItemId: 4,
                    product: {
                      id: 4,
                      name: "햄버거",
                      price: 8000,
                      imageUrl:
                        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8JUVEJTk2JTg0JUVCJUIyJTg0JUVBJUIxJUIwfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
                    },
                    total: 24000,
                    quantity: 3,
                    coupons: [],
                  },
                  {
                    orderItemId: 5,
                    product: {
                      id: 5,
                      name: "제로 콜라",
                      price: 2000,
                      imageUrl:
                        "https://images.unsplash.com/photo-1630404365865-97ff92feba6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTl8fCVFQyVCRCU5QyVFQiU5RCVCQ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
                    },
                    total: 14000,
                    quantity: 7,
                    coupons: [],
                  },
                  {
                    orderItemId: 6,
                    product: {
                      id: 6,
                      name: "감자튀김",
                      price: 4000,
                      imageUrl:
                        "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8JUVBJUIwJTkwJUVDJTlFJTkwJUVEJThBJTgwJUVBJUI5JTgwfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
                    },
                    total: 24000,
                    quantity: 6,
                    coupons: [],
                  },
                ],
              },
            ])
          )
        ),
      ],
    },
  },
};

export const decorators = [
  mswDecorator,
  (Story) => (
    <>
      <GlobalStyle />
      <RecoilRoot>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </RecoilRoot>
    </>
  ),
];

export default preview;
