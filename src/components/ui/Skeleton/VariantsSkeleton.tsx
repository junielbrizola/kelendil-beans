import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

export default function VariantsSkeleton() {
  return (
    <Box>
      <Box sx={{ display:'flex', gap:2, mb:4 }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} variant="rectangular" width={100} height={40} />
        ))}
      </Box>
      <Skeleton variant="rectangular" height={40} sx={{ mb:2 }} />
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} variant="rectangular" height={40} sx={{ mb:1 }} />
      ))}
    </Box>
  );
}
