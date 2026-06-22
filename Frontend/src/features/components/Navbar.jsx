import React, { useActionState } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex justify-between items-center py-3 px-20 bg-gray-100">
      <h1 className="text-2xl font-extrabold">Resume Builder</h1>
      <div className="pages flex gap-3 items-center">
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "underline text-blue-500" : ""
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "underline text-blue-500" : ""
          }
        >
          Login
        </NavLink>
        <NavLink
          to="/signup"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "underline text-blue-500" : ""
          }
        >
          Signup
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
