// src/components/admin/products/ProductForm.tsx
'use client';

import React, { useState } from 'react';
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
import { createProductAction } from '@/actions/products/createProduct';

const schema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(200, 'Máximo de 200 caracteres'),
  description: z.string().max(1000, 'Máximo de 1000 caracteres').optional(),
  type: z.enum(['COFFEE', 'COCOA'], 'Tipo inválido'),
  imageUrl: z.string().url('URL inválida').optional(),
});

type FormData = z.infer<typeof schema>;

export default function ProductForm() {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', description: '', type: 'COFFEE', imageUrl: '' }
  });

  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    setErrorMsg(null);
    setLoading(true);

    const fd = new FormData();
    fd.append('name', data.name);
    if (data.description) fd.append('description', data.description);
    fd.append('type', data.type);
    if (data.imageUrl) fd.append('imageUrl', data.imageUrl);

    const res = await createProductAction(fd);
    setLoading(false);

    if (res.success) {
      router.push(`/admin/products/${res?.data?.productId}`);
    } else {
      setErrorMsg(res?.error?.message as string);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      {errorMsg && <Alert severity="error" sx={{ mb: 2 }}>{errorMsg}</Alert>}

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
            multiline
            rows={4}
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
            select
            fullWidth
            margin="normal"
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
            fullWidth
            margin="normal"
            error={!!errors.imageUrl}
            helperText={errors.imageUrl?.message}
          />
        )}
      />

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          {loading ? 'Salvando...' : 'Criar Produto'}
        </Button>
      </Box>
    </Box>
  );
}
