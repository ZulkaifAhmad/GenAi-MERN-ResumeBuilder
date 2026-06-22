import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../auth/services/auth.context";
import { LogoutApi } from "../auth/services/auth.api.js";

const navLinkClass = ({ isActive, isPending }) =>
  isPending ? "pending" : isActive ? "underline text-blue-500" : "";

function Navbar() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await LogoutApi();
      setUser(null);
      console.log("User log out successfully")
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      console.log("Logout failed" , error.message);
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="flex justify-between items-center py-3 px-20 bg-gray-100">
      <h1 className="text-2xl font-extrabold">Resume Builder</h1>

      <div className="pages flex gap-3 items-center">
        <NavLink to="/" className={navLinkClass}>
          Home
        </NavLink>

        {user ? (
          <>
            <p className="text-sm text-gray-700 capitalize">{user.username}</p>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white rounded-md font-medium transition-colors duration-200"
            >
              {isLoggingOut ? "Logging out..." : "Logout"}
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className={navLinkClass}>
              Login
            </NavLink>
            <NavLink to="/signup" className={navLinkClass}>
              Signup
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
