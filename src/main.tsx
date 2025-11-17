import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { ComponentProvider } from "./components/provider";
import store from "./store";
import router from "./router";

import "./style.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ComponentProvider>
        <RouterProvider router={router} />
      </ComponentProvider>
    </Provider>
  </StrictMode>
);
