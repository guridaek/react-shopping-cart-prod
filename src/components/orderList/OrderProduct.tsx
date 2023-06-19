import { OrderItem } from "api/orders";
import React from "react";
import { styled } from "styled-components";

interface Props {
  order: OrderItem;
}

const OrderProduct = ({ order }: Props) => {
  return (
    <Wrapper>
      <ImgBox
        src={order.product.imageUrl}
        alt=""
        onError={(e) => {
          e.currentTarget.src = process.env.PUBLIC_URL + "/assets/image-not-available.jpg";
        }}
      />
      <NameBox>{order.product.name}</NameBox>
      <PriceBox>{(order.product.price * order.quantity).toLocaleString()}원</PriceBox>
    </Wrapper>
  );
};

const Wrapper = styled.ul`
  display: flex;
  flex-flow: wrap column;
  align-content: flex-start;
  row-gap: 12px;

  height: 160px;

  border-top: 1.5px solid rgba(204, 204, 204, 1);
  padding: 10px;

  @media screen and (max-width: 800px) {
    height: 120px;
  }
`;

const ImgBox = styled.img`
  width: 180px;
  height: 100%;
  border-radius: 5px;

  margin-right: 2%;

  @media screen and (max-width: 800px) {
    width: 100px;
    height: 100px;
  }
`;

const NameBox = styled.div`
  width: 60%;
  height: fit-content;

  padding-top: 1%;

  font-size: 18px;
  white-space: nowrap;

  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;

  @media screen and (max-width: 800px) {
    font-size: 17px;
  }
`;

const PriceBox = styled.div`
  width: 60%;
  height: fit-content;

  color: rgba(136, 136, 136, 1);
  font-size: 17px;
  font-weight: 400;

  @media screen and (max-width: 800px) {
    font-size: 16px;
  }
`;

export default OrderProduct;
