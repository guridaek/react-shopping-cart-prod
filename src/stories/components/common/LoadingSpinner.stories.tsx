import { StoryFn, Meta } from "@storybook/react";
import LoadingSpinner from "components/common/LoadingSpinner";

export default {
  title: "Common/LoadingSpinner",
  component: LoadingSpinner,
} as Meta;

const Template: StoryFn = () => <LoadingSpinner />;

export const Default = Template.bind({});
