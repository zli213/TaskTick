"use client";

import { store } from "./store";
import { Provider } from "react-redux";

const StoreProvider = (props) => {
  return <Provider store={store}>{props.children}</Provider>;
};

export default StoreProvider;
