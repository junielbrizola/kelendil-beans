'use client';
import React from "react";
import Container from "@mui/material/Container";
import CouponFormSkeleton from "@/components/ui/Skeleton/CouponFormSkeleton";

export default function AdminCreateCouponLoading() {
  return (
    <Container maxWidth="sm" sx={{ py:4 }}>
      <CouponFormSkeleton />
    </Container>
  );
}
