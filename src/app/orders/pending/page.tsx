// src/app/orders/pending/page.tsx
export const dynamic = 'auto';

import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from 'next/link';

export default function OrderPendingPage() {
  return (
    <Container maxWidth="sm" sx={{ py: 4, textAlign: 'center' }}>
      <Typography variant="h4" component="h1" gutterBottom color="warning.main">
        Pagamento Pendente
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Seu pagamento está pendente de confirmação. Assim que for aprovado, você receberá uma atualização.
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button component={Link} href="/" variant="contained">
          Voltar à Home
        </Button>
      </Box>
    </Container>
  );
}
