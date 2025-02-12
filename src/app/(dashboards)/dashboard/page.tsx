"use client";
import { Box, CircularProgress } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// export const generateMetadata = async ({ params }) => {
//   const baburchi = await getBaburchiByChefID(params.chefId);
//   const { name, description } = baburchi;
//   return {
//     title: {
//       absolute: `${name}`,
//     },
//     description: description,
//     keywords: description.split(" "),
//   };
// };

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth"); // Redirect if not logged in
    }
  }, [status, router]);

  if (status === "loading")
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );

  return <h1>Welcome {session?.user?.name}!</h1>;
}
