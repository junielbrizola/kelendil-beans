// src/components/cart/CartList.tsx
'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { updateCartItemAction } from '@/actions/cart/updateCartItem';
import { removeFromCartAction } from '@/actions/cart/removeFromCart';
import type { ActionResult } from '@/actions/types';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

type CartItem = {
  id: string;
  variantId: string;
  productName: string;
  imageUrl?: string;
  unitPrice: number;
  quantity: number;
};

interface Props {
  cartResult: ActionResult<{ items: CartItem[]; cartId: string }>;
}

export default function CartList({ cartResult }: Props) {
  const router = useRouter();
  const { success, data, error } = cartResult;
  const [updating, setUpdating] = useState<string|null>(null);

  if (!success) return <Typography color="error">{error.message}</Typography>;
  if (data.items.length === 0) {
    return <Typography>Seu carrinho está vazio.</Typography>;
  }

  const handleQtyChange = async (variantId:string, qty:number) => {
    setUpdating(variantId);
    const fd = new FormData();
    fd.append('userId', ''); // preencha com ID do usuário
    fd.append('variantId', variantId);
    fd.append('quantity', String(qty));
    await updateCartItemAction(fd);
    setUpdating(null);
    router.refresh();
  };

  const handleRemove = async (variantId:string) => {
    setUpdating(variantId);
    const fd = new FormData();
    fd.append('userId', '');
    fd.append('variantId', variantId);
    await removeFromCartAction(fd);
    setUpdating(null);
    router.refresh();
  };

  const total = data.items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);

  return (
    <>
      <TableContainer component={Paper} sx={{ mb:3 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Produto</TableCell>
              <TableCell>Preço unit.</TableCell>
              <TableCell>Qtd.</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.items.map(item => (
              <TableRow key={item.variantId} hover>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    {item.imageUrl && (
                      <Box sx={{ position: 'relative', width: 48, height: 48 }}>
                        <Image src={item.imageUrl} alt={item.productName} fill style={{ objectFit:'cover', borderRadius:4 }} />
                      </Box>
                    )}
                    <Typography noWrap>{item.productName}</Typography>
                  </Box>
                </TableCell>
                <TableCell>R$ {item.unitPrice.toFixed(2)}</TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    size="small"
                    value={item.quantity}
                    disabled={updating===item.variantId}
                    inputProps={{ min: 0 }}
                    sx={{ width: 80 }}
                    onChange={e => handleQtyChange(item.variantId, Math.max(0, Number(e.target.value)))}
                  />
                </TableCell>
                <TableCell align="right">
                  R$ {(item.unitPrice * item.quantity).toFixed(2)}
                </TableCell>
                <TableCell align="center">
                  <Button
                    size="small"
                    color="error"
                    disabled={updating===item.variantId}
                    onClick={() => handleRemove(item.variantId)}
                  >
                    Remover
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="flex-end" mb={4}>
        <Typography variant="h6">Total: R$ {total.toFixed(2)}</Typography>
      </Box>

      <Divider sx={{ mb:3 }} />

      <Box textAlign="right">
        <Button variant="contained" onClick={() => router.push('/checkout')}>
          Finalizar Compra
        </Button>
      </Box>
    </>
  );
}
