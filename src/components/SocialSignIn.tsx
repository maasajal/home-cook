"use client";

import { signIn, useSession } from "next-auth/react";
import { Button } from "@mui/material";
import { Google, Facebook } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const SocialSignIn = () => {
  const { status } = useSession();
  const router = useRouter();

  // Define type for provider
  const handleSocialLogin = async (
    provider: "google" | "facebook"
  ): Promise<void> => {
    try {
      const res = await signIn(provider);

      if (res?.error) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Authentication failed. Please try again.",
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login successful! Redirecting...",
        showConfirmButton: false,
        timer: 1500,
      });

      router.push("/dashboard");
    } catch (error) {
      console.error("Social login error:", error);
    }
  };

  // Redirect if user is already authenticated
  if (status === "authenticated") {
    router.push("/dashboard");
    return null; // Prevent rendering the buttons if already logged in
  }

  return (
    <div className="flex flex-col gap-4 mt-4">
      {/* Google Sign-In */}
      <Button
        variant="outlined"
        startIcon={<Google />}
        onClick={() => handleSocialLogin("google")}
        className="w-full border-gray-300 text-gray-700 hover:bg-gray-100"
      >
        Sign in with Google
      </Button>

      {/* Facebook Sign-In */}
      <Button
        variant="outlined"
        startIcon={<Facebook />}
        onClick={() => handleSocialLogin("facebook")}
        className="w-full border-gray-300 text-gray-700 hover:bg-gray-100"
      >
        Sign in with Facebook
      </Button>
    </div>
  );
};

export default SocialSignIn;
