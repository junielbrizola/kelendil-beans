import React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function VariantTableSkeleton() {
  return (
    <Box>
      <Skeleton variant="rectangular" height={40} sx={{ mb: 1 }} />
      {[...Array(5)].map((_, i) => (
        <Skeleton key={i} variant="rectangular" height={30} sx={{ mb: 1 }} />
      ))}
    </Box>
  )
}
