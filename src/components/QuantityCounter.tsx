import React from "react";
import { useQuantity } from "hooks/useQuantity";
import Counter from "components/common/Counter";

interface Props {
  itemId: number;
  lowerBound?: number;
}

const QuantityCounter = ({ itemId, lowerBound }: Props) => {
  const { quantity, changeQuantity, handleQuantityChanged, handleQuantityBlurred } =
    useQuantity(itemId);

  const handleCountInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!(e.target instanceof HTMLInputElement) || e.key !== "Enter") return;
    e.target.blur();
  };

  return (
    <>
      <Counter
        value={quantity}
        setValue={changeQuantity}
        onChange={handleQuantityChanged}
        onKeyDown={handleCountInputKey}
        onBlur={handleQuantityBlurred}
        placeholder="수량"
        lowerBound={lowerBound}
      />
    </>
  );
};

export default QuantityCounter;
