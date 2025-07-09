export const dynamic = 'auto';

import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '../../../../api/auth/[...nextauth]/route';
import { fetchProductDetailsAction } from '@/actions/products/fetchProductDetails';
import ProductForm from '@/components/admin/ProductForm';

interface EditPageProps {
  params: { id: string };
}

async function getProductInitial(id: string) {
  const fd = new FormData();
  fd.append('productId', id);
  const res = await fetchProductDetailsAction(fd);
  if (!res.success || !res?.data) return null;
  return {
    name: res?.data?.name,
    description: res?.data?.description,
    type: res?.data.
    
    
    
    type,
    imageUrl: res?.data.imageUrl,
  };
}

export default async function AdminProductEditPage({ params: { id } }: EditPageProps) {
  const session: any = await getServerSession(authOptions);
  if (!session || session?.user?.role !== 'ADMIN') redirect('/');

  const initial = await getProductInitial(id);
  if (!initial) {
    return <Typography color="error" sx={{ py:4 }}>Produto não encontrado</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ py:4 }}>
      <ProductForm productId={id} initial={initial} />
    </Container>
  );
}
