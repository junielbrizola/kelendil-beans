export const dynamic    = 'auto';
export const revalidate = 10;

import React, { Suspense } from "react";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AdminUserList from "@/components/admin/users/AdminUserList";
import AdminUserListSkeleton from "@/components/ui/Skeleton/AdminUserListSkeleton";
import { fetchUsersAction } from "@/actions/users/fetchUsers";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function AdminUsersPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") redirect("/");

  const fd = new FormData();
  const usersResult = await fetchUsersAction(fd);

  return (
    <Container maxWidth="lg" sx={{ py:4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Gestão de Usuários</Typography>
        <Button variant="contained" href="/admin/users/create">
          + Novo Usuário
        </Button>
      </Box>
      <Suspense fallback={<AdminUserListSkeleton />}>
        {/* @ts-expect-error Client */}
        <AdminUserList usersResult={usersResult} />
      </Suspense>
    </Container>
  );
}
