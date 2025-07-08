export const dynamic = 'auto';

import React from 'react';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import Container from '@mui/material/Container';
import { authOptions } from '../../../../api/auth/[...nextauth]/route';
import ProductDelete from '@/components/admin/ProductDelete';

interface DeletePageProps {
  params: { id: string };
}

export default async function AdminProductDeletePage({ params: { id } }: DeletePageProps) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/');
  }
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <ProductDelete productId={id} />
    </Container>
  );
}
