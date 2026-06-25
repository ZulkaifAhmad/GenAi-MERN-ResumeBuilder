import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Signup from "./features/auth/Signup.jsx";
import Login from "./features/auth/Login.jsx";
import Layout from "./features/pages/Layout.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./features/components/Protected.jsx";
import UserProvider from "./features/auth/services/auth.context.jsx";
import InterviewCoachDashboard from "./features/pages/Report.jsx";
import ReportsList from "./features/pages/ReportsList.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            index: true,
            element: <App />,
          },
          {
            path: "/report",
            element: <ReportsList />,
          },
          {
            path: "/report/:id",
            element: <InterviewCoachDashboard />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

createRoot(document.getElementById("root")).render(
  <UserProvider>
    <RouterProvider router={router} />
  </UserProvider>,
);
