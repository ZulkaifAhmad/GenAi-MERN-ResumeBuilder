import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { GetMeApi } from "../auth/services/auth.api.js";
import { useUser } from "../auth/services/auth.context.jsx";

export default function ProtectedRoute() {
  const { user, setUser } = useUser();
  const [authStatus, setAuthStatus] = useState("loading");

  useEffect(() => {
    async function checkAuth() {
      try {
        const data = await GetMeApi();
        console.log("user data fetched ", data);
        if (data?.userData) {
          console.log("User have authenticated");
          setAuthStatus("authenticated");
          setUser(data.userData);
        } else {
          console.log("User haven't authenticated");
          setAuthStatus("unauthenticated");
          setUser(null);
        }
      } catch (error) {
        console.log(error);
        setAuthStatus("unauthenticated");
        setUser(null);
      }
    }

    checkAuth();
  }, []);

  if (authStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (authStatus === "unauthenticated") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
