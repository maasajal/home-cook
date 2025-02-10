// src/providers/MuiProvider.tsx
"use client"; // Mark this as a Client Component

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/utils/theme";
import Navbar from "@/components/Navbar";

export const MuiProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
