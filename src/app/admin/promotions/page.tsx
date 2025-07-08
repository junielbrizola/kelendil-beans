export const dynamic    = 'auto';
export const revalidate = 10;

import React, { Suspense } from "react";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AdminPromotionList from "@/components/admin/promotions/AdminPromotionList";
import AdminPromotionListSkeleton from "@/components/ui/Skeleton/AdminPromotionListSkeleton";
import { fetchCouponsAction } from "@/actions/promotions/fetchCoupons";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function AdminPromotionsPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") redirect("/");

  const fd = new FormData();
  const result = await fetchCouponsAction(fd);

  return (
    <Container maxWidth="lg" sx={{ py:4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Promoções & Cupons</Typography>
        <Button variant="contained" href="/admin/promotions/create">
          + Novo Cupom
        </Button>
      </Box>
      <Suspense fallback={<AdminPromotionListSkeleton />}>
        {/* @ts-expect-error Client */}
        <AdminPromotionList result={result} />
      </Suspense>
    </Container>
  );
}
