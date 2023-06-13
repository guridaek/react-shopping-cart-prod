import { useRef } from "react";
import { useSetRecoilState } from "recoil";
import { toastState } from "recoil/toast";

export const useToast = () => {
  const setToast = useSetRecoilState(toastState);
  const timeoutId = useRef<number | null>(null);

  const showToast = (message: string) => {
    if (timeoutId.current) clearTimeout(timeoutId.current);

    setToast({ isShown: true, message: message });

    timeoutId.current = window.setTimeout(() => {
      setToast({ isShown: false, message: "" });
    }, 2000);
  };

  return { showToast };
};
