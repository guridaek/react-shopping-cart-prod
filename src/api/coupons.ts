import { ServerId } from "recoil/server";
import { COUPON_ERROR_MESSAGE, SERVER_LIST } from "constants/api";

export interface Coupon {
  couponId: number;
  name: string;
  discount: {
    type: "rate" | "price";
    amount: number;
  };
}

export const getCoupons = async (serverId: ServerId): Promise<Coupon[]> => {
  const response = await fetch(`${SERVER_LIST[serverId]}/coupons`, {
    method: "GET",
    headers: {
      Authorization: `Basic ${process.env.REACT_APP_USER_TOKEN}`,
    },
  });

  if (!response.ok) throw new Error(COUPON_ERROR_MESSAGE.GET);

  const data = await response.json().catch(() => {
    throw new Error(COUPON_ERROR_MESSAGE.GET);
  });

  return data;
};
