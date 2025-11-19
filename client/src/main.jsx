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
import store from "./store";
import { Provider } from "react-redux";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Workout from "./pages/Workout";
import Diet from "./pages/Diet";
import Settings from "./pages/Settings.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Private Routes */}
      <Route path="" element={<PrivateRoute />}>
        <Route index={true} path="/" element={<Dashboard />} />
        <Route path="/workout" element={<Workout />} />
        <Route path="/diet" element={<Diet />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>
);
