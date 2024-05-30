import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { DevicesProvider } from "./context/devices.context.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <DevicesProvider>
      <Toaster />
      <App />
    </DevicesProvider>
  </BrowserRouter>
);
