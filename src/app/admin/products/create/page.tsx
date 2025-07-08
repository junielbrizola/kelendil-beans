export const dynamic = 'auto';

import React from 'react';
import Container from '@mui/material/Container';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '../../../api/auth/[...nextauth]/route';
import ProductForm from '@/components/admin/ProductForm';

export default async function AdminProductCreatePage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') redirect('/');
  return (
    <Container maxWidth="md" sx={{ py:4 }}>
      <ProductForm />
    </Container>
  );
}
