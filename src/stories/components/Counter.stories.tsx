import { StoryFn, Meta } from "@storybook/react";
import QuantityCounter from "components/QuantityCounter";

export default {
  title: "Counter",
  component: QuantityCounter,
  tags: ["autodocs"],
  argTypes: {
    itemId: {
      description: "상품의 id",
    },
    lowerBound: {
      description: "변경할 수 있는 최소값",
    },
  },
} as Meta;

const Template: StoryFn = () => <QuantityCounter itemId={1} lowerBound={1} />;

export const Default = Template.bind({});
