import { removeCartItem } from "api/cartItems";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartListState } from "recoil/cart";
import { serverSelectState } from "recoil/server";
import { useReloadFromServer } from "./useReloadFromServer";

export const useCartCheckbox = () => {
  const selectedServer = useRecoilValue(serverSelectState);
  const [cartList, setCartList] = useRecoilState(cartListState);
  const [isAllchecked, setIsAllChecked] = useState(true);
  const [checkedCount, setCheckedCount] = useState(cartList.length);
  const { reloadCartList } = useReloadFromServer();

  useEffect(() => {
    const count = cartList.filter((item) => item.isChecked).length;

    setIsAllChecked(count === cartList.length);
    setCheckedCount(count);
  }, [cartList]);

  const setAllCheckbox = (isChecked: boolean) => {
    setCartList(
      cartList.map((item) => {
        return { ...item, isChecked: isChecked };
      })
    );
  };

  const removeCheckedItem = () => {
    const checkedList = cartList.filter((item) => item.isChecked);

    checkedList.forEach((item) => {
      removeCartItem(selectedServer, item.id).catch((err) => {
        alert(
          err instanceof Error
            ? err.message
            : "서버와의 통신이 원활하지 않습니다. 잠시후 다시 시도해주세요."
        );
      });
    });

    reloadCartList();
  };
  return { isAllchecked, checkedCount, setAllCheckbox, removeCheckedItem };
};
