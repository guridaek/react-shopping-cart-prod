import { ServerId } from "recoil/server";
import { PRODUCT_ERROR_MESSAGE, SERVER_LIST } from "constants/api";

export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export const getProducts = async (serverId: ServerId): Promise<Product[]> => {
  const response = await fetch(`${SERVER_LIST[serverId]}/products`, {
    method: "GET",
    headers: {
      Authorization: `Basic ${process.env.REACT_APP_USER_TOKEN}`,
    },
  });

  if (!response.ok) throw new Error(PRODUCT_ERROR_MESSAGE.GET);

  const data = await response.json().catch(() => {
    throw new Error(PRODUCT_ERROR_MESSAGE.GET);
  });

  return data;
};
