'use client';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/navigation';
import { createProductAction } from '@/actions/products/createProduct';
import { updateProductAction } from '@/actions/products/updateProduct';

const productSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(200, 'Nome muito longo'),
  description: z.string().max(1000, 'Descrição muito longa').optional(),
  type: z.enum(['COFFEE','COCOA'], { errorMap: () => ({ message: 'Tipo inválido' }) }),
  imageUrl: z.string().url('URL inválida').optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  productId?: string;
  initial?: Partial<ProductFormValues>;
}

export default function ProductForm({ productId, initial }: ProductFormProps) {
  const { register, handleSubmit, formState:{ errors, isSubmitting }, reset } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: initial || { name:'', description:'', type:'COFFEE', imageUrl:'' }
  });

  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  useEffect(() => {
    if (initial) reset(initial);
  }, [initial, reset]);

  const onSubmit = async (data: ProductFormValues) => {
    const fd = new FormData();
    if (productId) fd.append('productId', productId);
    fd.append('name', data.name);
    if (data.description) fd.append('description', data.description);
    fd.append('type', data.type);
    if (data.imageUrl) fd.append('imageUrl', data.imageUrl);

    const result = productId
      ? await updateProductAction(fd)
      : await createProductAction(fd);

    if (result.success) {
      enqueueSnackbar(
        `Produto ${productId ? 'atualizado' : 'criado'} com sucesso`,
        { variant: 'success' }
      );
      router.push('/admin/products');
    } else {
      const msg = result.error.fieldErrors
        ? Object.values(result.error.fieldErrors).join(' ')
        : result.error.message;
      enqueueSnackbar(msg, { variant: 'error' });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display:'grid', gap:2, maxWidth:600 }}>
      <Typography variant="h5" gutterBottom>
        {productId ? 'Editar Produto' : 'Novo Produto'}
      </Typography>

      <TextField
        label="Nome"
        {...register('name')}
        error={!!errors.name}
        helperText={errors.name?.message}
        fullWidth
      />

      <TextField
        label="Descrição"
        {...register('description')}
        error={!!errors.description}
        helperText={errors.description?.message}
        fullWidth
        multiline
        minRows={3}
      />

      <FormControl fullWidth error={!!errors.type}>
        <InputLabel id="type-label">Tipo</InputLabel>
        <Select
          labelId="type-label"
          label="Tipo"
          defaultValue={initial?.type || 'COFFEE'}
          {...register('type')}
        >
          <MenuItem value="COFFEE">Café</MenuItem>
          <MenuItem value="COCOA">Cacau</MenuItem>
        </Select>
        <Typography variant="caption" color="error">
          {errors.type?.message}
        </Typography>
      </FormControl>

      <TextField
        label="URL da Imagem"
        {...register('imageUrl')}
        error={!!errors.imageUrl}
        helperText={errors.imageUrl?.message}
        fullWidth
      />

      <Box sx={{ display:'flex', gap:2, mt:2 }}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={isSubmitting}
        >
          {productId ? 'Atualizar' : 'Criar'}
        </Button>
        <Button
          variant="outlined"
          onClick={() => router.push('/admin/products')}
        >
          Cancelar
        </Button>
      </Box>
    </Box>
  )
}