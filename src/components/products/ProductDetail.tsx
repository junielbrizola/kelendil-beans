// src/components/products/ProductDetail.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { useSnackbar } from 'notistack';
import { addToCartAction } from '@/actions/cart/addToCart';
import type { ActionResult } from '@/actions/types';
import type { ProductDetailData } from '@/actions/products/fetchProductById';

interface Props {
  productResult: ActionResult<ProductDetailData>;
}

export default function ProductDetail({ productResult }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const [variantId, setVariantId] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  if (!productResult.success) {
    return <Alert severity="error">{productResult.error.message}</Alert>;
  }

  const p = productResult.data;
  const firstVariant = p.variants[0]?.id;
  if (!variantId && firstVariant) setVariantId(firstVariant);

  const handleAddToCart = async () => {
    setSubmitting(true);
    const fd = new FormData();
    fd.append('userId', ''); // substituir pelo ID real do usuário logado
    fd.append('variantId', variantId);
    fd.append('quantity', String(quantity));
    const res = await addToCartAction(fd);
    setSubmitting(false);
    if (res.success) {
      enqueueSnackbar('Adicionado ao carrinho!', { variant: 'success' });
    } else {
      enqueueSnackbar(res.error.message, { variant: 'error' });
    }
  };

  return (
    <Box>
      {p.imageUrl && (
        <Box sx={{ position: 'relative', width: '100%', height: 400, mb: 3 }}>
          <Image
            src={p.imageUrl}
            alt={p.name}
            fill
            style={{ objectFit: 'cover', borderRadius: 8 }}
            priority
          />
        </Box>
      )}

      <Typography variant="h5" gutterBottom>{p.name}</Typography>
      {p.description && (
        <Typography variant="body1" color="text.secondary" paragraph>
          {p.description}
        </Typography>
      )}

      <Box component="form" sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
        <TextField
          select
          label="Variante"
          value={variantId}
          onChange={e => setVariantId(e.target.value)}
          size="small"
          sx={{ minWidth: 160 }}
        >
          {p.variants.map(v => (
            <MenuItem key={v.id} value={v.id}>
              {v.weightInGrams} g — R$ {v.price.toFixed(2)} {v.stock === 0 && '(Esgotado)'}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Quantidade"
          type="number"
          value={quantity}
          onChange={e => setQuantity(Math.max(1, Number(e.target.value)))}
          size="small"
          inputProps={{ min: 1 }}
          sx={{ width: 100 }}
        />

        <Button
          variant="contained"
          onClick={handleAddToCart}
          disabled={submitting || p.variants.find(v => v.id === variantId)?.stock === 0}
        >
          {submitting ? 'Adicionando...' : 'Adicionar ao Carrinho'}
        </Button>
      </Box>
    </Box>
  );
}
