import { atom } from "recoil";

export type ServerId = "msw" | "ttaengchil-server" | "ori-server";

export const serverSelectState = atom<ServerId>({
  key: "serverSelectState",
  default: "msw",
});
