import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppRouter from "./routers/AppRouter";
// import { ThemeProvider } from 'next-themes'
import Provider from "./Provider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <ThemeProvider enableSystem defaultTheme="dark" attribute="class"> */}
    <Provider>
       <AppRouter />
    </Provider>
     
    {/* </ThemeProvider> */}
  </React.StrictMode>
);
