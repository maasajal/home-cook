"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { axiosPublic } from "@/utils/useAxiosPublic";
import Swal from "sweetalert2";
import SocialSignIn from "@/components/SocialSignIn";
import { TextField, Button, Typography, Paper, Avatar } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
interface FormData {
  name?: string;
  email: string;
  password: string;
  image?: FileList;
}

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      if (isSignup) {
        const formData = new FormData();
        formData.append("name", data.name || "");
        formData.append("email", data.email);
        formData.append("password", data.password);
        if (data.image && data.image.length > 0) {
          formData.append("image", data.image[0]);
        }

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
        const result = await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: true,
        });

        if (result?.error) {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: `${result?.error}`,
            confirmButtonText: "Cool",
          });
        } else {
          router.back();
        }
      }
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  // Handle Image Preview
  const imageFile = watch("image");
  if (imageFile && imageFile.length > 0) {
    const file = imageFile[0];
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Paper elevation={3} className="p-6 w-96 bg-white rounded-lg shadow-md">
        <Typography variant="h5" className="text-center mb-4">
          {isSignup ? "Sign Up" : "Login"}
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {isSignup && (
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
          )}

          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: "Email is required",
              pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: "Password is required",
              minLength: { value: 6, message: "Min 6 characters" },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                type="password"
                label="Password"
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />

          {isSignup && (
            <>
              <input
                type="file"
                accept="image/*"
                {...register("image")}
                onChange={(e) => setValue("image", e.target.files as FileList)}
                className="hidden"
                id="upload-image"
              />
              <label
                htmlFor="upload-image"
                className="flex items-center gap-2 cursor-pointer"
              >
                <CloudUploadIcon />
                <span>
                  {imageFile?.length
                    ? imageFile[0].name
                    : "Upload Profile Image"}
                </span>
              </label>
              {imagePreview && (
                <Avatar
                  src={imagePreview}
                  className="mx-auto"
                  sx={{ width: 80, height: 80 }}
                />
              )}
            </>
          )}

          <Button type="submit" variant="contained" color="primary" fullWidth>
            {isSignup ? "Sign Up" : "Login"}
          </Button>
        </form>

        <Typography variant="body2" className="mt-2 text-center">
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <Button
            variant="text"
            color="primary"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Login" : "Sign Up"}
          </Button>
        </Typography>

        <SocialSignIn />
      </Paper>
    </div>
  );
}
