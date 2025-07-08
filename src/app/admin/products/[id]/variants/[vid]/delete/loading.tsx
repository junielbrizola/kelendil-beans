'use client';

import React from 'react';
import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';

export default function VariantDeleteLoading() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Skeleton variant="text" width="40%" height={32} sx={{ mb: 2 }} />
      <Skeleton variant="rectangular" height={56} sx={{ mb: 2 }} />
    </Container>
  );
}
