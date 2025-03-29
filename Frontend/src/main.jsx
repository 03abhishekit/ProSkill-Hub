




import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import {store} from "./app/store";
import { Toaster } from "react-hot-toast"; 
import AppWrapper from "./AppWrapper";




createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
       <AppWrapper>
        <App />
        <Toaster position="top-right" reverseOrder={false} />  
        </AppWrapper>
    </Provider>
  </StrictMode>
);
