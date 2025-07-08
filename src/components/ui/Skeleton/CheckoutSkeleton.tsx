import React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function CheckoutSkeleton() {
  return (
    <Box sx={{ display: 'grid', gap: 2 }}>
      <Skeleton variant="rectangular" height={56} />
      <Skeleton variant="rectangular" height={56} />
      <Skeleton variant="rectangular" height={40} width={150} />
      <Skeleton variant="rectangular" height={40} width={150} />
    </Box>
  )
}
