// src/components/ui/Skeleton/RelatedProductsSkeleton.tsx
import React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function RelatedProductsSkeleton() {
  return (
    <Box sx={{ mt: 4, display: 'flex', gap: 2, overflowX: 'auto', py: 2 }}>
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} variant="rectangular" width={160} height={200} />
      ))}
    </Box>
  );
}
