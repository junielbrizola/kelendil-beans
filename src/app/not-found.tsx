// src/app/not-found.tsx
import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  return (
    <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        404 — Página Não Encontrada
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        A página que você está procurando não existe.
      </Typography>
      <Button variant="contained" onClick={() => router.push('/')}>
        Voltar à Home
      </Button>
    </Container>
  );
}
