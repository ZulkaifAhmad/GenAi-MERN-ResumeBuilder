import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const signupSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters"),
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

function Signup() {
  const [serverMessage, setServerMessage] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    setIsPending(true);
    setServerMessage(null);

    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        console.log(result)
        setServerMessage(result.message || "Signup failed");
        return;
      }

      console.log("Registered:", result);
      setServerMessage("Registration successful! Redirecting to login...");
      navigate("/login")

    } catch (err) {
      setServerMessage("Something went wrong. Try again.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Signup to Resume Builder
        </h1>
        <p className="text-sm text-gray-500 text-center mt-2">
          Enter your details to continue
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter username"
              autoComplete="off"
              {...register("username")}
              className={`mt-1 w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.username ? "border-red-400" : "border-gray-300"
              }`}
            />
            {errors.username && (
              <p className="text-xs text-red-500 mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              autoComplete="email"
              {...register("email")}
              className={`mt-1 w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? "border-red-400" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              autoComplete="current-password"
              {...register("password")}
              className={`mt-1 w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password ? "border-red-400" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className={`w-full py-2 rounded-lg font-medium text-white transition ${
              isPending ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
           {isPending ? "Signing up..." : "Signup"}
          </button>

          {serverMessage && (
            <p className="text-center text-sm text-red-500 mt-2">
              {serverMessage}
            </p>
          )}

          <div className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;