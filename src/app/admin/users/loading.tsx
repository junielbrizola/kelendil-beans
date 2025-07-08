'use client';
import React from "react";
import Container from "@mui/material/Container";
import AdminUserListSkeleton from "@/components/ui/Skeleton/AdminUserListSkeleton";

export default function AdminUsersLoading() {
  return (
    <Container maxWidth="lg" sx={{ py:4 }}>
      <AdminUserListSkeleton />
    </Container>
  );
}
