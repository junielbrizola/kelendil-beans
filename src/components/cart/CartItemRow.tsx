'use client';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import { updateCartItemAction } from '@/actions/cart/updateCartItem';
import { removeFromCartAction } from '@/actions/cart/removeFromCart';
import { useSnackbar } from 'notistack';

interface CartItemRowProps {
  item: {
    variantId: string;
    productName: string;
    imageUrl?: string;
    weightInGrams: number;
    unitPrice: number;
    quantity: number;
    total: number;
  };
  userId: string;
}

export default function CartItemRow({ item, userId }: CartItemRowProps) {
  const [qty, setQty] = useState(item.quantity);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const onChangeQty = async (newQty: number) => {
    setLoading(true);
    const fd = new FormData();
    fd.append('userId', userId);
    fd.append('variantId', item.variantId);
    fd.append('quantity', String(newQty));
    const res = await updateCartItemAction(fd);
    setLoading(false);
    if (res.success) {
      setQty(newQty);
      enqueueSnackbar('Quantidade atualizada', { variant: 'success' });
    } else {
      enqueueSnackbar(res.error.message, { variant: 'error' });
    }
  };

  const onRemove = async () => {
    setLoading(true);
    const fd = new FormData();
    fd.append('userId', userId);
    fd.append('variantId', item.variantId);
    const res = await removeFromCartAction(fd);
    setLoading(false);
    if (res.success) {
      enqueueSnackbar('Item removido', { variant: 'success' });
    } else {
      enqueueSnackbar(res.error.message, { variant: 'error' });
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1, borderBottom: 1, borderColor: 'divider' }}>
      <Box
        component="img"
        src={item.imageUrl || '/placeholder.png'}
        alt={item.productName}
        sx={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 1 }}
      />
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1">{item.productName}</Typography>
        <Typography variant="body2" color="text.secondary">
          {item.weightInGrams}g • R$ {item.unitPrice.toFixed(2)} c/u
        </Typography>
      </Box>
      <TextField
        type="number"
        value={qty}
        onChange={e => onChangeQty(Number(e.target.value))}
        disabled={loading}
        inputProps={{ min: 1, style: { width: 60, textAlign: 'center' } }}
        size="small"
      />
      <Typography sx={{ width: 80, textAlign: 'right' }}>
        R$ {item.total.toFixed(2)}
      </Typography>
      <IconButton onClick={onRemove} disabled={loading}>
        <DeleteIcon />
      </IconButton>
    </Box>
);
}