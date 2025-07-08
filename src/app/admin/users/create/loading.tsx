'use client';
import React from "react";
import Container from "@mui/material/Container";
import UserFormSkeleton from "@/components/ui/Skeleton/UserFormSkeleton";

export default function AdminCreateUserLoading() {
  return (
    <Container maxWidth="sm" sx={{ py:4 }}>
      <UserFormSkeleton />
    </Container>
  );
}
