"use client";

import React, { useActionState } from "react";
import { Link } from "react-router-dom";
import { LoginApi } from "./services/auth.api.js";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [state, formAction, isPending] = useActionState(loginAction, {
    error: null,
    success: null,
  });

  async function loginAction(prevState, formData) {
    try {
      const email = formData.get("email");
      const password = formData.get("password");

      const data = await LoginApi({ email, password });
      console.log(data);
      navigate("/");

      return { error: null, success: data?.message };
    } catch (error) {
      console.log(error);
      const message = error.response?.data?.message || "Something went wrong";
      return { error: message, success: null };
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Login to Resume Builder
        </h1>
        <p className="text-sm text-gray-500 text-center mt-2">
          Enter your details to continue
        </p>

        <form action={formAction} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              autoComplete="email"
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              autoComplete="current-password"
              required
              minLength={8}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {state.error && (
            <p className="text-sm text-red-500 text-center">{state.error}</p>
          )}
          {state.success && (
            <p className="text-sm text-green-500 text-center">
              {state.success}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className={`w-full py-2 rounded-lg font-medium text-white transition ${
              isPending
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isPending ? "Logging in..." : "Login"}
          </button>

          <div className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 hover:underline font-medium"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
