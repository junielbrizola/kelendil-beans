// src/components/admin/orders/AdminOrderDetails.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { fetchOrderDetailsAction } from '@/actions/orders/fetchOrderDetails';
import { updateOrderStatusAction } from '@/actions/orders/updateOrderStatus';
import type { ActionResult } from '@/actions/types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';

interface Props {
  orderId: string;
}

export default function AdminOrderDetails({ orderId }: Props) {
  const [orderResult, setOrderResult] = useState<ActionResult<any>>( { success: false, error: { code: '', message: 'Loading...' } } );
  const [status, setStatus] = useState<string>('');
  const [feedback, setFeedback] = useState<string|null>(null);

  const load = async () => {
    const fd = new FormData();
    fd.append('orderId', orderId);
    const res = await fetchOrderDetailsAction(fd);
    setOrderResult(res);
    if (res.success) setStatus(res.data.status);
  };

  useEffect(() => { load(); }, []);

  if (!orderResult.success) {
    return <Alert severity="error">{orderResult.error.message}</Alert>;
  }
  const o = orderResult.data;

  const handleStatusChange = async () => {
    setFeedback(null);
    const fd = new FormData();
    fd.append('orderId', orderId);
    fd.append('status', status);
    const res = await updateOrderStatusAction(fd);
    if (res.success) {
      setFeedback('Status atualizado com sucesso');
      load();
    } else {
      setFeedback(`Erro: ${res.error.message}`);
    }
  };

  return (
    <Box>
      {feedback && <Alert severity="info" sx={{ mb:2 }}>{feedback}</Alert>}

      <Box display="flex" alignItems="center" gap={2} sx={{ mb:3 }}>
        <Typography>Status:</Typography>
        <Select
          value={status}
          onChange={e => setStatus(e.target.value)}
          size="small"
        >
          <MenuItem value="PENDING">PENDING</MenuItem>
          <MenuItem value="CONFIRMED">CONFIRMED</MenuItem>
          <MenuItem value="SHIPPED">SHIPPED</MenuItem>
          <MenuItem value="DELIVERED">DELIVERED</MenuItem>
          <MenuItem value="CANCELLED">CANCELLED</MenuItem>
        </Select>
        <Button variant="contained" size="small" onClick={handleStatusChange}>
          Atualizar
        </Button>
      </Box>

      <Divider sx={{ mb:3 }} />

      <Typography variant="h6" gutterBottom>Itens</Typography>
      <TableContainer component={Paper} sx={{ mb:3 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Produto</TableCell>
              <TableCell align="right">Qtd.</TableCell>
              <TableCell align="right">Unit.</TableCell>
              <TableCell align="right">Subtotal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {o.items.map((i:any) => (
              <TableRow key={i.variantId}>
                <TableCell>{i.productName}</TableCell>
                <TableCell align="right">{i.quantity}</TableCell>
                <TableCell align="right">R$ {i.unitPrice.toFixed(2)}</TableCell>
                <TableCell align="right">R$ {(i.unitPrice * i.quantity).toFixed(2)}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3} align="right"><Typography>Total</Typography></TableCell>
              <TableCell align="right"><Typography>R$ {o.totalAmount.toFixed(2)}</Typography></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6" gutterBottom>Pagamento</Typography>
      <Typography>
        {o.payment
          ? `${o.payment.provider} — ${o.payment.status} — R$ ${o.payment.amount.toFixed(2)}`
          : 'Sem informação de pagamento'}
      </Typography>

      <Box sx={{ my:3 }}><Divider /></Box>

      <Typography variant="h6" gutterBottom>Envio</Typography>
      <Typography>
        {o.shipment
          ? `${o.shipment.provider} (${o.shipment.service}) — ${o.shipment.status} — R$ ${o.shipment.cost.toFixed(2)}`
          : 'Sem informação de envio'}
      </Typography>

      <Box sx={{ my:3 }}><Divider /></Box>

      <Typography variant="h6" gutterBottom>Eventos</Typography>
      {o.events.map((evt:any) => (
        <Box key={evt.id} sx={{ mb:1 }}>
          <Typography variant="body2">
            {evt.type}: {evt.description || '-'} ({new Date(evt.createdAt).toLocaleString()})
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
