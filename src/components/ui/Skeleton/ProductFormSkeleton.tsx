// src/components/ui/Skeleton/ProductFormSkeleton.tsx
import React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function ProductFormSkeleton() {
  return (
    <Box>
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} variant="rectangular" height={56} sx={{ mb: 2 }} />
      ))}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Skeleton variant="rectangular" width={160} height={48} />
      </Box>
    </Box>
  );
}
