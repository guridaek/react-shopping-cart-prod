import React from "react";
import { RecoilRoot } from "recoil";
import { PageRouterProvider } from "./router";
import Toast from "components/common/Toast";

const App = () => {
  return (
    <RecoilRoot>
      <PageRouterProvider />
      <Toast />
    </RecoilRoot>
  );
};

export default App;
