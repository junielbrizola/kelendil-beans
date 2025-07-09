// Server Component
import React from "react";
import Container from "@mui/material/Container";
import SignupForm from "@/components/auth/SignupForm";

export const dynamic = "auto";
export const revalidate = 0;

export default function SignupPage() {
  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{ display: "flex", flexDirection: "column", py: 8 }}
    >
      <SignupForm />
    </Container>
  );
}
