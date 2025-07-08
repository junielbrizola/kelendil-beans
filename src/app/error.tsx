// src/app/error.tsx
'use client';

import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  const router = useRouter();
  return (
    <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Ops! Algo deu errado.
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {error?.message || 'Um erro inesperado ocorreu.'}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button variant="contained" onClick={() => reset()}>
          Tentar Novamente
        </Button>
        <Button variant="outlined" onClick={() => router.push('/')}>
          Voltar à Home
        </Button>
      </Box>
    </Container>
  );
}
