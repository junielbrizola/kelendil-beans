'use client';
import React from 'react';
import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';

export default function ResetPasswordLoading() {
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Skeleton variant="text" width="60%" height={32} sx={{ mx: 'auto' }} />
      <Skeleton variant="rectangular" height={56} sx={{ mb: 2 }} />
      <Skeleton variant="rectangular" height={56} />
    </Container>
  );
}
