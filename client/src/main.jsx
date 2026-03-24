import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
  BarElement,
  Tooltip,
} from "chart.js";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
  BarElement,
  Tooltip,
);
import store from "./store";
import { Provider } from "react-redux";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Workout from "./pages/Workout";
import Nutrition from "./pages/Nutrition.jsx";

import Records from "./pages/Records.jsx";
import Settings from "./pages/Settings.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";

import { GoogleOAuthProvider } from "@react-oauth/google";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Private Routes */}
      <Route path="" element={<PrivateRoute />}>
        <Route index element={<Dashboard />} />
        <Route path="/workout" element={<Workout />} />
        <Route path="/nutrition" element={<Nutrition />} />

        <Route path="/records" element={<Records />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Route>,
  ),
);

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <Provider store={store}>
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>
    </Provider>
  </GoogleOAuthProvider>,
);
