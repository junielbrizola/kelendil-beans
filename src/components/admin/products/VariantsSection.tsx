'use client';

import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchVariantsAction } from '@/actions/products/variants/fetchVariants';
import { createVariantAction } from '@/actions/products/variants/createVariant';
import { updateVariantAction } from '@/actions/products/variants/updateVariant';
import { deleteVariantAction } from '@/actions/products/variants/deleteVariant';
import type { ActionResult } from '@/actions/types';

const variantSchema = z.object({
  productId: z.string().uuid(),
  weightInGrams: z.number().int().positive(),
  price: z.number().nonnegative(),
  stock: z.number().int().nonnegative()
});

type VariantFormData = z.infer<typeof variantSchema>;

interface Props {
  productId: string;
}

export default function VariantsSection({ productId }: Props) {
  const [variants, setVariants] = useState<VariantFormData & { id: string }[]>([]);
  const [errorMsg, setErrorMsg] = useState<string|null>(null);

  const { control, handleSubmit, reset, formState: { errors } } = useForm<VariantFormData>({
    resolver: zodResolver(variantSchema),
    defaultValues: { productId, weightInGrams: 0, price: 0, stock: 0 }
  });

  const load = async () => {
    const fd = new FormData();
    fd.append('productId', productId);
    const res = await fetchVariantsAction(fd);
    if (res.success) {
      setVariants(res.data.variants as any);
    }
  };

  useEffect(() => { load(); }, [productId]);

  const onCreate = async (data: VariantFormData) => {
    setErrorMsg(null);
    const fd = new FormData();
    Object.entries(data).forEach(([k,v]) => fd.append(k, String(v)));
    const res = await createVariantAction(fd);
    if (res.success) {
      reset({ productId, weightInGrams: 0, price: 0, stock: 0 });
      load();
    } else {
      setErrorMsg(res.error.message);
    }
  };

  const onUpdate = async (id: string, data: Partial<VariantFormData>) => {
    const fd = new FormData();
    fd.append('variantId', id);
    Object.entries(data).forEach(([k,v]) => fd.append(k, String(v)));
    const res = await updateVariantAction(fd);
    if (res.success) load();
    else setErrorMsg(res.error.message);
  };

  const onDelete = async (id: string) => {
    const fd = new FormData();
    fd.append('variantId', id);
    const res = await deleteVariantAction(fd);
    if (res.success) load();
    else setErrorMsg(res.error.message);
  };

  return (
    <Box>
      {errorMsg && <Alert severity="error" sx={{ mb:2 }}>{errorMsg}</Alert>}

      {/* Formulário de criação rápida */}
      <Box component="form" onSubmit={handleSubmit(onCreate)} sx={{ mb:4 }}>
        <Controller name="productId" control={control} render={({ field }) => <input type="hidden" {...field} />} />
        <Box sx={{ display:'flex', gap:2, flexWrap:'wrap' }}>
          <Controller
            name="weightInGrams"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Peso (g)" type="number" size="small" error={!!errors.weightInGrams} helperText={errors.weightInGrams?.message} />
            )}
          />
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Preço" type="number" size="small" error={!!errors.price} helperText={errors.price?.message} />
            )}
          />
          <Controller
            name="stock"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Estoque" type="number" size="small" error={!!errors.stock} helperText={errors.stock?.message} />
            )}
          />
          <Button type="submit" variant="contained" size="medium">Adicionar</Button>
        </Box>
      </Box>

      {/* Tabela de variantes */}
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Peso (g)</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell>Estoque</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {variants.map(v => (
              <TableRow key={v.id} hover>
                <TableCell>
                  <TextField
                    defaultValue={v.weightInGrams}
                    type="number"
                    size="small"
                    onBlur={e => onUpdate(v.id, { weightInGrams: Number(e.target.value) })}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    defaultValue={v.price}
                    type="number"
                    size="small"
                    onBlur={e => onUpdate(v.id, { price: Number(e.target.value) })}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    defaultValue={v.stock}
                    type="number"
                    size="small"
                    onBlur={e => onUpdate(v.id, { stock: Number(e.target.value) })}
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton color="error" onClick={() => onDelete(v.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {variants.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">Nenhuma variante cadastrada.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
