// src/app/admin/products/[id]/page.tsx
export const dynamic = 'auto';

import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ProductForm from '@/components/admin/ProductForm';
import { fetchProductDetailsAction } from '@/actions/products';

interface EditProductPageProps {
  params: { id: string };
}

export default async function EditProductPage({
  params: { id },
}: EditProductPageProps) {
  const formData = new FormData();
  formData.append('productId', id);
  const { success, data, error } = await fetchProductDetailsAction(formData);

  if (!success || !data) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography color="error">
          {error?.message || 'Erro ao carregar dados do produto.'}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Editar Produto
      </Typography>
      <ProductForm
        mode="edit"
        productId={id}
        initialData={{
          name: data.name,
          description: data.description,
          type: data.type,
          imageUrl: data.imageUrl || '',
        }}
      />
    </Container>
  );
}
