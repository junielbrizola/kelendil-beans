'use client';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/navigation';
import { createVariantAction } from '@/actions/products/variants/createVariant';
import { updateVariantAction } from '@/actions/products/variants/updateVariant';

const variantSchema = z.object({
  weightInGrams: z.number().int().positive('Peso deve ser positivo'),
  price: z.number().nonnegative('Preço deve ser não-negativo'),
  stock: z.number().int().nonnegative('Estoque deve ser não-negativo'),
});

type VariantFormValues = z.infer<typeof variantSchema>;

interface VariantFormProps {
  productId: string;
  variantId?: string;
  initial?: Partial<VariantFormValues>;
}

export default function VariantForm({ productId, variantId, initial }: VariantFormProps) {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<VariantFormValues>({
    resolver: zodResolver(variantSchema),
    defaultValues: initial || { weightInGrams: 0, price: 0, stock: 0 }
  });
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  useEffect(() => {
    if (initial) reset(initial);
  }, [initial, reset]);

  const onSubmit = async (data: VariantFormValues) => {
    const fd = new FormData();
    fd.append('productId', productId);
    if (variantId) fd.append('variantId', variantId);
    fd.append('weightInGrams', data.weightInGrams.toString());
    fd.append('price', data.price.toString());
    fd.append('stock', data.stock.toString());

    const res = variantId
      ? await updateVariantAction(fd)
      : await createVariantAction(fd);

    if (res.success) {
      enqueueSnackbar(`Variante ${variantId ? 'atualizada' : 'criada'} com sucesso`, { variant: 'success' });
      router.push(`/admin/products/${productId}/variants`);
    } else {
      const msg = res.error.fieldErrors
        ? Object.values(res.error.fieldErrors).join(' ')
        : res.error.message;
      enqueueSnackbar(msg, { variant: 'error' });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'grid', gap: 2, maxWidth: 400 }}>
      <Typography variant="h5">
        {variantId ? 'Editar Variante' : 'Nova Variante'}
      </Typography>
      <TextField
        label="Peso (g)"
        type="number"
        {...register('weightInGrams', { valueAsNumber: true })}
        error={!!errors.weightInGrams}
        helperText={errors.weightInGrams?.message}
        fullWidth
      />
      <TextField
        label="Preço (R$)"
        type="number"
        {...register('price', { valueAsNumber: true })}
        error={!!errors.price}
        helperText={errors.price?.message}
        fullWidth
      />
      <TextField
        label="Estoque"
        type="number"
        {...register('stock', { valueAsNumber: true })}
        error={!!errors.stock}
        helperText={errors.stock?.message}
        fullWidth
      />
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Button variant="contained" type="submit" disabled={isSubmitting}>
          {variantId ? 'Atualizar' : 'Criar'}
        </Button>
        <Button variant="outlined" onClick={() => router.push(`/admin/products/${productId}/variants`)}>
          Cancelar
        </Button>
      </Box>
    </Box>
  );
}
