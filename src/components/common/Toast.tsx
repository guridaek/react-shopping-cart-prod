import React from "react";
import { createPortal } from "react-dom";
import { useRecoilValue } from "recoil";
import { toastState } from "recoil/toast";
import { keyframes, styled } from "styled-components";

const Toast = () => {
  const { isShown, message } = useRecoilValue(toastState);
  return createPortal(
    isShown && <Wrapper>{message}</Wrapper>,
    document.getElementById("toast") as HTMLDivElement
  );
};

const fadeIn = keyframes`
  0% {
    transform: translate(0 ,100%);
    opacity: 0;
  }

  50% {
    transform: translate(0, 50%);
    opacity: 0.5;
  }

  100%{
    transform: translate(0, 0);
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  min-width: 250px;
  margin-left: -125px;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 2px;
  padding: 16px;
  position: fixed;
  z-index: 1;
  left: 50%;
  bottom: 30px;

  animation: ${fadeIn} 0.2s linear;
`;

export default Toast;
