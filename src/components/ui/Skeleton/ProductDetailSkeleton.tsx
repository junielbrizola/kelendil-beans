// src/components/ui/Skeleton/ProductDetailSkeleton.tsx
import React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function ProductDetailSkeleton() {
  return (
    <Box sx={{ display: 'grid', gap: 2, maxWidth: 800, mx: 'auto', p: 2 }}>
      <Skeleton variant="rectangular" height={400} />
      <Skeleton variant="text" width="50%" />
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="rectangular" height={56} />
      <Skeleton variant="rectangular" height={36} width="30%" />
      <Skeleton variant="rectangular" height={48} />
    </Box>
  );
}
