
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

// Validation
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const navigate = useNavigate();

  const [firebaseError, setFirebaseError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  // Login Function
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setFirebaseError("");

      await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      navigate("/");
    } catch (error) {
      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        setFirebaseError("Invalid email or password");
      } else {
        setFirebaseError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white flex items-center justify-center px-5 py-12">

      <div className="w-full max-w-md bg-[#111] border border-gray-800 p-8 md:p-10">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif">
            Welcome <span className="text-[#d4af37]">Back</span>
          </h1>

          <p className="text-gray-400 mt-3">
            Sign in to your CHRONOS account.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm">
              Email Address
            </label>

            <input
              type="email"
              {...register("email")}
              placeholder="Enter your email"
              className="w-full bg-[#080808] border border-gray-700 px-4 py-3 outline-none focus:border-[#d4af37]"
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm">
              Password
            </label>

            <input
              type="password"
              {...register("password")}
              placeholder="Enter your password"
              className="w-full bg-[#080808] border border-gray-700 px-4 py-3 outline-none focus:border-[#d4af37]"
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Firebase Error */}
          {firebaseError && (
            <p className="text-red-500 text-sm">
              {firebaseError}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#d4af37] text-black py-3 uppercase tracking-widest font-semibold hover:bg-white transition disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Login"}
          </button>

        </form>

        {/* Register Link */}
        <p className="text-gray-400 text-center mt-7">
          Don't have an account?

          <Link
            to="/register"
            className="text-[#d4af37] ml-2 hover:underline"
          >
            Create Account
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;

