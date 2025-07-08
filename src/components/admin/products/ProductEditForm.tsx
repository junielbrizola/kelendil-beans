'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { fetchProductsAction } from '@/actions/products/fetchProducts';
import { updateProductAction } from '@/actions/products/updateProduct';
import type { ActionResult } from '@/actions/types';

const schema = z.object({
  productId: z.string().uuid(),
  name: z.string().min(1, 'Nome é obrigatório').max(200),
  description: z.string().max(1000).optional(),
  type: z.enum(['COFFEE','COCOA']),
  imageUrl: z.string().url().optional(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  productId: string;
}

export default function ProductEditForm({ productId }: Props) {
  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { productId, name: '', description: '', type: 'COFFEE', imageUrl: '' }
  });

  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string|null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // carregar produto
    (async () => {
      const fd = new FormData();
      fd.append('search',''); // sem filtro
      const res = await fetchProductsAction(fd);
      // filtrar produto pelo ID
      if (res.success) {
        const prod = res.data.products.find(p => p.id === productId);
        if (prod) {
          reset({ productId, name: prod.name, description: prod.description, type: prod.type, imageUrl: prod.imageUrl||'' });
        }
      }
    })();
  }, [productId, reset]);

  const onSubmit = async (data: FormData) => {
    setErrorMsg(null);
    setLoading(true);

    const fd = new FormData();
    fd.append('productId', data.productId);
    fd.append('name', data.name);
    if (data.description) fd.append('description', data.description);
    fd.append('type', data.type);
    if (data.imageUrl) fd.append('imageUrl', data.imageUrl);

    const res = await updateProductAction(fd);
    setLoading(false);

    if (res.success) {
      router.refresh();
    } else {
      setErrorMsg(res.error.message);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      {errorMsg && <Alert severity="error" sx={{ mb:2 }}>{errorMsg}</Alert>}

      <Controller
        name="productId"
        control={control}
        render={({ field }) => <input type="hidden" {...field} />}
      />

      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Nome"
            fullWidth
            margin="normal"
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Descrição"
            fullWidth
            margin="normal"
            multiline rows={3}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
        )}
      />

      <Controller
        name="type"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Tipo"
            select fullWidth margin="normal"
            error={!!errors.type}
            helperText={errors.type?.message}
          >
            <MenuItem value="COFFEE">Café</MenuItem>
            <MenuItem value="COCOA">Cacau</MenuItem>
          </TextField>
        )}
      />

      <Controller
        name="imageUrl"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="URL da Imagem"
            fullWidth margin="normal"
            error={!!errors.imageUrl}
            helperText={errors.imageUrl?.message}
          />
        )}
      />

      <Box sx={{ display:'flex', justifyContent:'flex-end', mt:3 }}>
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          {loading ? 'Salvando...' : 'Atualizar Produto'}
        </Button>
      </Box>
    </Box>
  );
}
