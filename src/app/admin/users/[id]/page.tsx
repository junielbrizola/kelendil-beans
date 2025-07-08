export const dynamic    = 'auto';
export const revalidate = 0;

import React, { Suspense } from "react";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import UserEditForm from "@/components/admin/users/UserEditForm";
import UserFormSkeleton from "@/components/ui/Skeleton/UserFormSkeleton";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface Props { params:{ id:string } }

export default async function AdminEditUserPage({ params }:Props) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role!=="ADMIN") redirect("/");

  return (
    <Container maxWidth="sm" sx={{ py:4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Editar Usuário</Typography>
        <Button variant="outlined" component={Link} href="/admin/users">
          Voltar
        </Button>
      </Box>
      <Suspense fallback={<UserFormSkeleton />}>
        {/* @ts-expect-error Client */}
        <UserEditForm userId={params.id} />
      </Suspense>
    </Container>
  );
}
