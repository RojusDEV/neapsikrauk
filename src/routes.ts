import { createBrowserRouter } from "react-router";
import App from "./App";
import Dashboard from "./routes/Dashboard";
import AuthLayout from "./routes/layout/AuthLayout";
import SignupPage from "./routes/auth/SignupPage";
import SigninPage from "./routes/auth/SigninPage";
import Landingpage from "./routes/Landingpage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Landingpage },
      { path: "dashboard", Component: Dashboard },
      {
        path: "auth",
        Component: AuthLayout,
        children: [
          { path: "signin", Component: SigninPage },
          { path: "signup", Component: SignupPage },
        ],
      },
    ],
  },
]);
