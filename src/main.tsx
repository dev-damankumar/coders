import ReactDOM from "react-dom/client";
import "./index.css";
import "./main.css";
import "./components/Footer/Footer.css";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./providers/Auth.tsx";
import ErrorBoundry from "./providers/ErrorBoundry.tsx";
import router from "./routers/index.tsx";
import { NotificationProvider } from "./providers/Notification.tsx";
import { StudioProvider } from "./providers/StudioProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <ErrorBoundry>
    <NotificationProvider>
      <AuthProvider>
        <StudioProvider>
          <RouterProvider router={router} />
        </StudioProvider>
      </AuthProvider>
    </NotificationProvider>
  </ErrorBoundry>
  // </React.StrictMode>
);
