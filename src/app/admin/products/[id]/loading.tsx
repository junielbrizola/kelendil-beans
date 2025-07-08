// src/app/admin/products/[id]/loading.tsx
'use client';

import React from 'react';
import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

export default function EditProductLoading() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Skeleton variant="text" width="40%" height={48} sx={{ mb: 2 }} />
      <Box sx={{ display: 'grid', gap: 2 }}>
        <Skeleton variant="rectangular" height={56} />
        <Skeleton variant="rectangular" height={56} />
        <Skeleton variant="rectangular" height={56} />
        <Skeleton variant="rectangular" height={56} />
      </Box>
    </Container>
  );
}
