import { StoryFn, Meta } from "@storybook/react";
import OrderList from "components/orderList/OrderList";

export default {
  title: "OrderList/OrderList",
  component: OrderList,
  argTypes: {},
} as Meta;

const Template: StoryFn = () => <OrderList />;

export const Default = Template.bind({});
