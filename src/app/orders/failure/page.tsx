// src/app/orders/failure/page.tsx
export const dynamic = 'auto';

import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from 'next/link';

export default function OrderFailurePage() {
  return (
    <Container maxWidth="sm" sx={{ py: 4, textAlign: 'center' }}>
      <Typography variant="h4" component="h1" gutterBottom color="error">
        Pagamento Não Aprovado
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Houve um problema ao processar seu pagamento. Por favor, tente novamente.
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button component={Link} href="/checkout" variant="contained">
          Tentar Novamente
        </Button>
        <Button component={Link} href="/" variant="outlined">
          Voltar à Home
        </Button>
      </Box>
    </Container>
  );
}
