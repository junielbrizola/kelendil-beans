// src/components/ui/Skeleton/CartSummarySkeleton.tsx
import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

export default function CartSummarySkeleton() {
  return (
    <Box>
      {[...Array(3)].map((_, i) => (
        <Skeleton key={i} variant="rectangular" height={80} sx={{ mb: 1 }} />
      ))}
      <Skeleton variant="text" width="30%" sx={{ mt: 2 }} />
    </Box>
  );
}
