import { StoryFn, Meta } from "@storybook/react";
import Toast from "components/common/Toast";
import { useToast } from "hooks/useToast";
import { styled } from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  width: 22%;

  padding: 1% 5%;

  font-size: 17px;
  color: rgba(255, 255, 255, 1);
  background: #333333;

  cursor: pointer;
`;

const ToastButton = () => {
  const { showToast } = useToast();

  return (
    <Button
      onClick={() => {
        showToast("토스트 입니다!!!!!!!!!!!!!!!!");
      }}
    >
      토스트 띄우기
    </Button>
  );
};

export default {
  title: "Common/Toast",
  component: Toast,
  decorators: [
    (Story) => (
      <Wrapper>
        <ToastButton />
        <Story />
      </Wrapper>
    ),
  ],
} as Meta;

const Template: StoryFn = () => <Toast />;

export const Default = Template.bind({});
