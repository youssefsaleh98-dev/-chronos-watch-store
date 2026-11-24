
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { auth } from "../firebase";

// 1. Validation Schema
const registerSchema = z
  .object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Register = () => {
  const navigate = useNavigate();

  const [firebaseError, setFirebaseError] = useState("");
  const [loading, setLoading] = useState(false);

  // 2. React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  // 3. Create Account
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setFirebaseError("");

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(userCredential.user, {
        displayName: `${data.firstName} ${data.lastName}`,
      });

      navigate("/");
    } catch (error) {
      setFirebaseError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white flex items-center justify-center px-5 py-12">

      <div className="w-full max-w-lg bg-[#111] border border-gray-800 p-8 md:p-10">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif">
            Join <span className="text-[#d4af37]">CHRONOS</span>
          </h1>

          <p className="text-gray-400 mt-3">
            Create your account and discover timeless elegance.
          </p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* First Name */}
          <div>
            <label className="block mb-2 text-sm">First Name</label>

            <input
              type="text"
              {...register("firstName")}
              placeholder="Enter your first name"
              className="w-full bg-[#080808] border border-gray-700 px-4 py-3 outline-none focus:border-[#d4af37]"
            />

            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block mb-2 text-sm">Last Name</label>

            <input
              type="text"
              {...register("lastName")}
              placeholder="Enter your last name"
              className="w-full bg-[#080808] border border-gray-700 px-4 py-3 outline-none focus:border-[#d4af37]"
            />

            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm">Email Address</label>

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
            <label className="block mb-2 text-sm">Password</label>

            <input
              type="password"
              {...register("password")}
              placeholder="Create a password"
              className="w-full bg-[#080808] border border-gray-700 px-4 py-3 outline-none focus:border-[#d4af37]"
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-2 text-sm">Confirm Password</label>

            <input
              type="password"
              {...register("confirmPassword")}
              placeholder="Confirm your password"
              className="w-full bg-[#080808] border border-gray-700 px-4 py-3 outline-none focus:border-[#d4af37]"
            />

            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
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
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

        {/* Login Link */}
        <p className="text-gray-400 text-center mt-7">
          Already have an account?

          <Link
            to="/login"
            className="text-[#d4af37] ml-2 hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;
