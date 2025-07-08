export const dynamic = 'auto';

import React from 'react';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import Container from '@mui/material/Container';
import { authOptions } from '../../../../../api/auth/[...nextauth]/route';
import VariantDelete from '@/components/admin/VariantDelete';

interface Props { params: { id: string; vid: string } }

export default async function VariantDeletePage({
  params: { id, vid }
}: Props) {
  const session = await getServerSession(authOptions);
  if (!session || session?.user?.role !== 'ADMIN') redirect('/');
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <VariantDelete variantId={vid} productId={id} />
    </Container>
  );
}
