'use client';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { deleteVariantAction } from '@/actions/products/variants/deleteVariant';

export default function VariantDelete({
  variantId,
  productId
}: {
  variantId: string;
  productId: string;
}) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    setLoading(true);
    const fd = new FormData();
    fd.append('variantId', variantId);
    const res = await deleteVariantAction(fd);
    setLoading(false);
    if (res.success) {
      enqueueSnackbar('Variante excluída com sucesso', { variant: 'success' });
      router.push(`/admin/products/${productId}/variants`);
    } else {
      enqueueSnackbar(res?.error?.message, { variant: 'error' });
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom>
        Excluir Variante
      </Typography>
      <Typography sx={{ mb: 3 }}>
        Tem certeza que deseja excluir esta variante? Esta ação não pode ser desfeita.
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button
          variant="outlined"
          onClick={() => router.push(`/admin/products/${productId}/variants`)}
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button variant="contained" color="error" onClick={onDelete} disabled={loading}>
          {loading ? 'Excluindo...' : 'Confirmar Exclusão'}
        </Button>
      </Box>
    </Box>
  )
}