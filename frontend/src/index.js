import React from "react";

import { createRoot } from "react-dom/client";
import App from "./App";
import store from "./Redux/store";
import { Provider } from "react-redux";

const container = document.getElementById("anuj");

const root = createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
