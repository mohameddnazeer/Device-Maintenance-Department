import React from "react";
import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import Provider from "./Provider";
import AppRouter from "./routers/AppRouter";
import ThemeProvider from "./ThemeProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <Provider>
        <div className="min-h-screen">
          <AppRouter />
        </div>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
