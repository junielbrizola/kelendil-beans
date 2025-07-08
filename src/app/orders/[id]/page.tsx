export const dynamic = 'auto';

import React from 'react';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import OrderDetails from '@/components/orders/OrderDetails';
import { authOptions } from '../api/auth/[...nextauth]/route';

interface Props { params: { id: string } }

export default async function OrderDetailPage({ params: { id } }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) redirect(`/login?callbackUrl=/orders/${id}`);
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Detalhes do Pedido
      </Typography>
      {/* @ts-expect-error Server Component */}
      <OrderDetails orderId={id} />
    </Container>
  );
}
