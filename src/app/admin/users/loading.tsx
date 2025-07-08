// src/app/admin/users/loading.tsx
'use client';

import React from 'react';
import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';

export default function AdminUsersLoading() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Skeleton variant="text" width="30%" height={32} sx={{ mb: 2 }} />
      {[...Array(5)].map((_, i) => (
        <Skeleton key={i} variant="rectangular" height={40} sx={{ mb: 1 }} />
      ))}
    </Container>
  );
}
