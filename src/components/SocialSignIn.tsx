"use client";

import { signIn, useSession } from "next-auth/react";
import { Button } from "@mui/material";
import { Google, Facebook } from "@mui/icons-material";
import { useRouter } from "next/navigation";

const SocialSignIn = () => {
  const session = useSession();
  const router = useRouter();
  const handleSocialLogin = async (provider) => {
    const res = await signIn(provider);
    console.log("social login", res);
    if (session?.status === "authenticated") {
      router.push("/dashboard");
    }
  };
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
