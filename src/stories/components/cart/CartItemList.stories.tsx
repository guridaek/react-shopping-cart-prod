import { StoryFn, Meta } from "@storybook/react";
import CartItemList from "components/cart/CartItemList";

export default {
  title: "Cart/CartItemList",
  component: CartItemList,
} as Meta;

const Template: StoryFn = () => <CartItemList />;

export const Default = Template.bind({});
