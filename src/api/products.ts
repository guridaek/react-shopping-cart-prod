import { ServerId } from "recoil/server";
import { SERVER_LIST, USER_TOKEN } from "./constants";

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
      Authorization: `Basic ${USER_TOKEN}`,
    },
  });

  if (response.status !== 200) throw new Error(response.statusText);

  return response.json();
};
