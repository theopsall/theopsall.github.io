import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { legacy_createStore as createStore } from "redux";
import App from "./App";
import "./index.css";
import reducers from "./reducers/reducers";
const store = createStore(reducers);

// Set dark mode by default for terminal theme
document.documentElement.classList.add('dark');

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
