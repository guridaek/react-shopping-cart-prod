import { postOrder } from "api/orders";
import { SHIPPING_FEE } from "constants/cartProduct";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { cartListState, cartTotalPrice } from "recoil/cart";
import { couponListState, totalCouponDiscount } from "recoil/coupon";
import { serverSelectState } from "recoil/server";
import { ROUTER_PATH } from "router";
import styled from "styled-components";

const PurchaseOrder = () => {
  const navigate = useNavigate();
  const totalPrice = useRecoilValue(cartTotalPrice);
  const couponDiscount = useRecoilValue(totalCouponDiscount);
  const selectedServer = useRecoilValue(serverSelectState);
  const cartList = useRecoilValue(cartListState);
  const couponList = useRecoilValue(couponListState);

  const requestOrder = async () => {
    const result = await postOrder(
      selectedServer,
      cartList.map((item) => {
        const coupon = couponList.find((coupon) => coupon.productId === item.product.id);

        return {
          cartItemId: item.id,
          product: item.product,
          quantity: item.quantity,
          couponIds: coupon ? [coupon.couponId] : [],
        };
      })
    );

    if (!result) {
      alert("주문에 실패했습니다. 다시 시도해주세요.");
      return;
    }

    navigate(ROUTER_PATH.OrderList);
  };

  return (
    <Wrapper>
      <TitleBox>결제 예상 금액</TitleBox>
      <TotalContainer>
        <AmountBox>
          <p>상품 금액</p>
          <p>{totalPrice.toLocaleString()}원</p>
        </AmountBox>
        <AmountBox>
          <p>배송비</p>
          <p>{(totalPrice ? SHIPPING_FEE : 0).toLocaleString()}원</p>
        </AmountBox>
        <AmountBox>
          <p>쿠폰 할인</p>
          <p>- {couponDiscount.toLocaleString()}원</p>
        </AmountBox>
        <AmountBox>
          <p>최종 결제 금액</p>
          <p>{(totalPrice ? totalPrice + SHIPPING_FEE - couponDiscount : 0).toLocaleString()}원</p>
        </AmountBox>
      </TotalContainer>
      <OrderButton onClick={requestOrder}>주문하기</OrderButton>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;

  position: sticky;
  top: 12%;
  margin-left: auto;

  width: 30%;
  height: 40%;

  border: 1px solid rgba(221, 221, 221, 1);
  padding: 2%;

  @media screen and (max-width: 800px) {
    position: fixed;
    gap: 0;

    top: auto;
    right: 0;
    bottom: 0;

    width: 100%;
    height: 30%;

    border-top: 1px solid black;

    background-color: white;
  }
`;

const TitleBox = styled.h2`
  border-bottom: 1px solid rgba(221, 221, 221, 1);

  padding-bottom: 5%;

  font-size: 21px;
  font-weight: 400;
`;

const TotalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  height: 60%;
  padding: 3%;

  div:last-child {
    margin-top: auto;
    margin-bottom: 8%;
  }
`;

const AmountBox = styled.div`
  display: flex;
  justify-content: space-between;

  text-align: center;
  font-size: 16px;
  font-weight: 600;
`;

const OrderButton = styled.button`
  width: 100%;

  padding: 7% 10%;

  font-size: 19px;
  color: rgba(255, 255, 255, 1);
  background: #333333;

  cursor: pointer;
`;

export default PurchaseOrder;
