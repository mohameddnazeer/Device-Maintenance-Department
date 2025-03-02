import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppRouter from "./routers/AppRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { ThemeProvider } from 'next-themes'
import Provider from "./Provider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <ThemeProvider enableSystem defaultTheme="dark" attribute="class"> */}
    <Provider>
      <ToastContainer position="top-center" />
       <AppRouter />
    </Provider>
     
    {/* </ThemeProvider> */}
  </React.StrictMode>
);
