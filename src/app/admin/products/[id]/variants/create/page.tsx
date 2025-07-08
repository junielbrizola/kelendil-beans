export const dynamic = 'auto';

import React from 'react';
import Container from '@mui/material/Container';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '../../../../api/auth/[...nextauth]/route';
import VariantForm from '@/components/admin/VariantForm';

interface Props { params: { id: string } }

export default async function VariantCreatePage({ params: { id } }: Props) {
  const session = await getServerSession(authOptions);
  if (!session || session?.user?.role !== 'ADMIN') redirect('/');
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <VariantForm productId={id} />
    </Container>
  );
}
