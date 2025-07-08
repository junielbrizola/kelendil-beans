// src/components/ui/Skeleton/ProductDetailSkeleton.tsx
import React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

export default function ProductDetailSkeleton() {
  return (
    <Box>
      <Skeleton variant="rectangular" width="100%" height={400} sx={{ borderRadius: 2, mb: 3 }} />
      <Skeleton variant="text" width="40%" height={40} sx={{ mb: 2 }} />
      <Skeleton variant="text" width="80%" sx={{ mb: 4 }} />
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Skeleton variant="rectangular" width={160} height={40} />
        <Skeleton variant="rectangular" width={100} height={40} />
        <Skeleton variant="rectangular" width={200} height={40} />
      </Box>
    </Box>
  );
}
