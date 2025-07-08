// src/components/ui/Skeleton/ProductGridSkeleton.tsx
import React from 'react';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

export default function ProductGridSkeleton() {
  return (
    <Grid container spacing={3}>
      {Array.from({ length: 8 }).map((_, idx) => (
        <Grid key={idx} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <Skeleton variant="rounded" height={180} />
          <Skeleton variant="text" sx={{ mt: 1, width: '80%' }} />
          <Skeleton variant="text" sx={{ width: '60%' }} />
        </Grid>
      ))}
    </Grid>
  );
}
