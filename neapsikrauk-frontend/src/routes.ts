import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Dashboard from "./routes/Dashboard";
import AuthLayout from "./routes/layout/AuthLayout";
import Landingpage from "./routes/Landingpage";
import SigninPage from "./routes/auth/SigninPage";
import SignupPage from "./routes/auth/SignupPage";
import JobPage from "./routes/JobPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Landingpage },
      { path: "dashboard", children: [
        {index: true, Component: Dashboard},
        {path: ":page", Component: Dashboard}
      ]},
      {
        path: "auth",
        Component: AuthLayout,
        children: [
          { path: "signin", Component: SigninPage },
          { path: "signup", Component: SignupPage },
        ],
      },
      {
        path: "jobs/:id/:slug",
        Component: JobPage,
      },
    ],
  },
]);
