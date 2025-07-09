export const dynamic = 'auto';

import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '../../../../../../api/auth/[...nextauth]/route';
import VariantForm from '@/components/admin/VariantForm';
import { fetchVariantDetailsAction } from '@/actions/products/variants/fetchVariantDetails';

interface Props { params: { id: string; vid: string } }

async function getInitial(id: string, vid: string) {
  const fd = new FormData();
  fd.append('variantId', vid);
  const res = await fetchVariantDetailsAction(fd);
  if (!res.success || !res?.data) return null;
  return {
    weightInGrams: res?.data?.weightInGrams,
    price: res?.data?.price,
    stock: res?.data?.stock,
  };
}

export default async function VariantEditPage({ params: { id, vid } }: Props) {
  const session: any = await getServerSession(authOptions);
  if (!session || session?.user?.role !== 'ADMIN') redirect('/');
  const initial = await getInitial(id, vid);
  if (!initial) {
    return <Typography color="error" sx={{ py: 4 }}>Variante não encontrada</Typography>;
  }
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <VariantForm productId={id} variantId={vid} initial={initial} />
    </Container>
  );
}
