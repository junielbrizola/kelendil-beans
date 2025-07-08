'use server';
import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { fetchOrderDetailsAction } from '@/actions/orders/fetchOrderDetails';

interface OrderDetailsProps {
  orderId: string;
}

export default async function OrderDetails({ orderId }: OrderDetailsProps) {
  const fd = new FormData();
  fd.append('orderId', orderId);
  const res = await fetchOrderDetailsAction(fd);

  if (!res.success || !res.data) {
    return <Typography color="error">Erro ao carregar detalhes do pedido.</Typography>;
  }

  const { items, totalAmount, status, payment, shipment, events, createdAt } = res.data;

  return (
    <Box sx={{ display: 'grid', gap: 3 }}>
      <Typography variant="h5">Pedido #{orderId.slice(0, 8)}</Typography>
      <Typography color="text.secondary">
        Criado em: {new Date(createdAt).toLocaleString()}
      </Typography>
      <Divider />

      <Typography variant="h6">Itens</Typography>
      <List>
        {items.map(item => (
          <ListItem key={item.variantId}>
            {item.quantity}× {item.productName} (R$ {item.unitPrice.toFixed(2)})
          </ListItem>
        ))}
      </List>

      <Divider />
      <Typography variant="h6">Total: R$ {totalAmount.toFixed(2)}</Typography>
      <Typography>Status: {status}</Typography>

      {payment && (
        <>
          <Divider />
          <Typography variant="h6">Pagamento</Typography>
          <Typography>Provedor: {payment.provider}</Typography>
          <Typography>Status: {payment.status}</Typography>
          <Typography>Valor: R$ {payment.amount.toFixed(2)}</Typography>
        </>
      )}

      {shipment && (
        <>
          <Divider />
          <Typography variant="h6">Envio</Typography>
          <Typography>Provedor: {shipment.provider}</Typography>
          <Typography>Serviço: {shipment.service}</Typography>
          <Typography>Status: {shipment.status}</Typography>
          {shipment.trackingCode && (
            <Typography>Rastreamento: {shipment.trackingCode}</Typography>
          )}
        </>
      )}

      {events.length > 0 && (
        <>
          <Divider />
          <Typography variant="h6">Histórico de Eventos</Typography>
          <List>
            {events.map(evt => (
              <ListItem key={evt.id}>
                [{new Date(evt.createdAt).toLocaleString()}] {evt.type}: {evt.description || '-'}
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Box>
);
}