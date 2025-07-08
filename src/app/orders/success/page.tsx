// src/app/orders/success/page.tsx
export const dynamic = 'auto';

import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from 'next/link';

interface SuccessPageProps {
  searchParams: { orderId?: string };
}

export default function OrderSuccessPage({ searchParams }: SuccessPageProps) {
  const { orderId } = searchParams;

  return (
    <Container maxWidth="sm" sx={{ py: 4, textAlign: 'center' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Obrigado pela sua compra!
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {orderId
          ? 'Seu pedido foi processado com sucesso.'
          : 'Seu pagamento foi aprovado com sucesso.'}
      </Typography>

      {orderId && (
        <Button
          component={Link}
          href={`/orders/${orderId}`}
          variant="contained"
          size="large"
          sx={{ mt: 2 }}
        >
          Ver detalhes do pedido
        </Button>
      )}

      <Box sx={{ mt: 4 }}>
        <Button component={Link} href="/" variant="outlined">
          Voltar à Home
        </Button>
      </Box>
    </Container>
);
}
