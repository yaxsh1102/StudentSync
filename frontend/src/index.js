import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import { appRouter } from "./pages/StudentSync";
import AppContextProvider from "./context/AppContext";
import { Toaster } from "react-hot-toast"; // Import Toaster from react-hot-toast

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

    <AppContextProvider>
      <Toaster position="top-right" reverseOrder={false} /> {/* Add Toaster here */}
          <App />
    </AppContextProvider>

);

reportWebVitals();
