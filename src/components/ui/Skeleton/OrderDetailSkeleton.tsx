import React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function OrderDetailSkeleton() {
  return (
    <Box sx={{ display: 'grid', gap: 2, py: 4 }}>
      <Skeleton variant="text" width="40%" height={32} />
      <Skeleton variant="text" width="20%" height={24} />

      <Skeleton variant="rectangular" height={200} />

      <Skeleton variant="text" width="30%" height={28} />
      <Skeleton variant="rectangular" height={150} />

      <Skeleton variant="text" width="30%" height={28} />
      <Skeleton variant="rectangular" height={100} />

      <Skeleton variant="text" width="30%" height={28} />
      <Skeleton variant="rectangular" height={100} />

      <Skeleton variant="text" width="40%" height={32} />
      <Skeleton variant="text" width="20%" height={24} />
    </Box>
  )
}