// src/app/page.tsx
import * as React from "react";
import { Button, Container } from "@mui/material";

export default function Home() {
  return (
    <Container className="p-4 text-center">
      <h1>Welcome to HomeCook</h1>
      <p className="mt-2">Order a chef to cook delicious meals at your home.</p>
      <Button variant="contained" color="primary" className="mt-4">
        Get Started
      </Button>
    </Container>
  );
}
