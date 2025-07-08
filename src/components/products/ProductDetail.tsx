// src/components/products/ProductDetail.tsx
'use client';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Image from 'next/image';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/navigation';
import { fetchProductDetailsAction, ProductDetailData } from '@/actions/products/fetchProductDetails';
import { addToCartAction } from '@/actions/cart/addToCart';
import { useSession } from 'next-auth/react';
import { useSnackbar } from 'notistack';
import RelatedProducts from './RelatedProducts';

interface ProductDetailProps {
  productId: string;
}

export default function ProductDetail({ productId }: ProductDetailProps) {
  const { data: session } = useSession();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const [detail, setDetail] = useState<ProductDetailData | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    (async () => {
      const fd = new FormData();
      fd.append('productId', productId);
      const res = await fetchProductDetailsAction(fd);
      if (res.success) {
        setDetail(res.data);
        if (res.data.variants.length > 0) {
          setSelectedVariant(res.data.variants[0].id);
        }
      }
    })();
  }, [productId]);

  const onAddToCart = async () => {
    if (!session) {
      router.push(`/login?callbackUrl=/products/${productId}`);
      return;
    }
    const fd = new FormData();
    fd.append('userId', session.user.id);
    fd.append('variantId', selectedVariant);
    fd.append('quantity', String(quantity));
    const res = await addToCartAction(fd);
    if (res.success) {
      enqueueSnackbar('Adicionado ao carrinho', { variant: 'success' });
      router.push('/cart');
    } else {
      enqueueSnackbar(res.error.message, { variant: 'error' });
    }
  };

  if (!detail) return null;

  return (
    <Box sx={{ display: 'grid', gap: 3, maxWidth: 800, mx: 'auto', p: 2 }}>
      {detail.imageUrl && (
        <Box sx={{ position: 'relative', width: '100%', height: 400, borderRadius: 2, overflow: 'hidden' }}>
          <Image
            src={detail.imageUrl}
            alt={detail.name}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </Box>
      )}
      <Typography variant="h4">{detail.name}</Typography>
      {detail.description && (
        <Typography variant="body1" color="text.secondary">
          {detail.description}
        </Typography>
      )}
      <FormControl fullWidth>
        <InputLabel id="variant-label">Variante</InputLabel>
        <Select
          labelId="variant-label"
          value={selectedVariant}
          label="Variante"
          onChange={e => setSelectedVariant(e.target.value)}
        >
          {detail.variants.map(v => (
            <MenuItem key={v.id} value={v.id}>
              {v.weightInGrams}g — R$ {v.price.toFixed(2)} {v.stock === 0 && "(Esgotado)"}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <Typography>Quantidade:</Typography>
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={e => setQuantity(Number(e.target.value))}
          style={{ width: 60, padding: '4px' }}
        />
      </Box>
      <Button
        variant="contained"
        size="large"
        disabled={!selectedVariant}
        onClick={onAddToCart}
      >
        Adicionar ao Carrinho
      </Button>
      <RelatedProducts productId={productId} type={detail.type} />
    </Box>
  );
}
