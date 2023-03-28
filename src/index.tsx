import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { store as setupStore } from "redux/store";
import App from "App";
import "styles/index.scss";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={setupStore()}>
      <App />
    </Provider>
  </React.StrictMode>,
);
