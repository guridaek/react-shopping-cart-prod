export const SERVER_LIST = {
  msw: "msw",
  "power-server": "https://power2.better-than-coupang.kro.kr",
  "ttaengchil-server": "https://0chil.better-than-coupang.kro.kr",
  "ori-server": "https://duck.better-than-coupang.kro.kr",
} as const;

export const CART_ERROR_MESSAGE = {
  GET: "장바구니 목록을 불러오는데 실패했습니다. 관리자에게 문의해 주세요.",
  POST: {
    CLIENT: "존재하지 않는 상품입니다. 확인 후 다시 시도해 주세요.",
    SERVER: "일시적인 오류로 상품을 추가에 실패했습니다. 새로고침 후 다시 시도해 주세요.",
  },
  PATCH: {
    CLIENT: "존재하지 않는 상품입니다. 확인 후 다시 시도해 주세요.",
    SERVER: "일시적인 오류로 상품 수량 변경에 실패했습니다. 새로고침 후 다시 시도해 주세요.",
  },
  DELETE: {
    CLIENT: "존재하지 않는 상품입니다. 확인 후 다시 시도해 주세요.",
    SERVER: "일시적인 오류로 상품 제거에 실패했습니다. 새로고침 후 다시 시도해 주세요.",
  },
} as const;

export const ORDER_ERROR_MESSAGE = {
  GET: "주문 목록을 불러오는데 실패했습니다. 관리자에게 문의해 주세요.",
  POST: {
    CLIENT: "주문에 실패했습니다. 새로고침 후 다시 시도해 주세요.",
    SERVER: "일시적인 오류로 주문에 실패했습니다. 잠시 후 다시 시도해 주세요.",
  },
} as const;

export const COUPON_ERROR_MESSAGE = {
  GET: "쿠폰 목록을 불러오는데 실패했습니다. 관리자에게 문의해 주세요.",
} as const;

export const PRODUCT_ERROR_MESSAGE = {
  GET: "상품 목록을 불러오는데 실패했습니다. 관리자에게 문의해 주세요.",
} as const;
