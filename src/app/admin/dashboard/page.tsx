// src/app/admin/dashboard/page.tsx
export const dynamic    = 'auto';
export const revalidate = 10;

import React, { Suspense } from "react";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { fetchDashboardStats } from "@/actions/admin/fetchDashboardStats";
import AdminDashboardSkeleton from "@/components/ui/Skeleton/AdminDashboardSkeleton";
import AdminDashboardContent from "@/components/admin/dashboard/AdminDashboardContent";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    redirect("/");
  }

  const stats = await fetchDashboardStats();

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Suspense fallback={<AdminDashboardSkeleton />}>
        {/* @ts-expect-error Client Component */}
        <AdminDashboardContent stats={stats} />
      </Suspense>
    </Container>
  );
}
