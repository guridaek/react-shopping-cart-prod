import { StoryFn, Meta } from "@storybook/react";
import Header from "components/Header";
import { rest } from "msw";

export default {
  title: "Header",
  component: Header,
} as Meta;

const Template: StoryFn = () => <Header />;

export const Default = Template.bind({});

export const EmptyCart = Template.bind({});

EmptyCart.parameters = {
  msw: {
    handlers: [
      rest.get("*/cart-items", (req, res, ctx) => res(ctx.status(200), ctx.json([]))),
      rest.get("msw/orders", (req, res, ctx) =>
        res(ctx.status(200), ctx.set("Content-Type", "application/json"), ctx.json([]))
      ),
    ],
  },
};
