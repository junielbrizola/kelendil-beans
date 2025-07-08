'use client';
import React from "react";
import Container from "@mui/material/Container";
import AdminPromotionListSkeleton from "@/components/ui/Skeleton/AdminPromotionListSkeleton";

export default function AdminPromotionsLoading() {
  return (
    <Container maxWidth="lg" sx={{ py:4 }}>
      <AdminPromotionListSkeleton />
    </Container>
  );
}
