"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { axiosPublic } from "@/utils/useAxiosPublic";
import Swal from "sweetalert2";
import SocialSignIn from "@/components/SocialSignIn";

// export const metadata = {
//   title: "Login",
//   description: "Login to order Chef (Baburchi) at your home",
//   keywords: ["login", "auth", "signup", "register", "signin"],
// };

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSignup) {
      // Signup API call
      const res = await axiosPublic.post("/auth/signup", formData);
      if (res.status === 201) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Signup successful, please login.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      // Login via NextAuth
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: true,
      });

      if (result?.error) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `${result?.error}`,
          confirmButtonText: "Cool",
        });
      } else router.back();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">
          {isSignup ? "Sign Up" : "Login"}
        </h2>

        {isSignup && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="w-full p-2 mt-2 border rounded"
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-2 mt-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-2 mt-2 border rounded"
        />

        <button
          onClick={handleSubmit}
          className="w-full p-2 mt-4 text-white bg-blue-600 rounded"
        >
          {isSignup ? "Sign Up" : "Login"}
        </button>

        <p className="mt-2 text-sm">
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="ml-1 text-blue-600 underline"
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>
      <SocialSignIn />
      </div>
    </div>
  );
}
