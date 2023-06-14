import { StoryFn, Meta } from "@storybook/react";
import ItemList from "components/main/ItemList";

export default {
  title: "Main/ItemList",
  component: ItemList,
} as Meta;

const Template: StoryFn = () => <ItemList />;

export const Default = Template.bind({});
