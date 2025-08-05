import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import rootReducer from "./reducer/index.js";
import { configureStore } from "@reduxjs/toolkit";
import { Toaster } from "react-hot-toast";

// import { NotificationProvider } from "./context/NotificationContext";

const store = configureStore({
  reducer: rootReducer,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        {/* <NotificationProvider> */}
          <App />
          <Toaster />
        {/* </NotificationProvider> */}
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
