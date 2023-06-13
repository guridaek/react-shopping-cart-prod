import { atom } from "recoil";

export interface ToastState {
  isShown: boolean;
  message: string;
}

export const toastState = atom<ToastState>({
  key: "toastState",
  default: { isShown: false, message: "" },
});
