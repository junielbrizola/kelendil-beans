// src/app/admin/users/[id]/loading.tsx
'use client';

import React from 'react';
import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

export default function AdminUserDetailLoading() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box>
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} variant="text" height={24} sx={{ mb: 1 }} />
        ))}
      </Box>
    </Container>
  );
}
