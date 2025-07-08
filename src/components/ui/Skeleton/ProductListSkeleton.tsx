// src/components/ui/Skeleton/ProductListSkeleton.tsx
import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Skeleton from '@mui/material/Skeleton';

export default function ProductListSkeleton() {
  return (
    <Box>
      <Grid container spacing={4}>
        {Array.from({ length: 8 }).map((_, i) => (
          <Grid xs={12} sm={6} md={4} lg={3} key={i}>
            <Box>
              <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2 }} />
              <Skeleton variant="text" width="60%" sx={{ mt: 1 }} />
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="rectangular" width="40%" height={36} sx={{ mt: 2, borderRadius: 1 }} />
            </Box>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Skeleton variant="rectangular" width={240} height={40} />
      </Box>
    </Box>
  );
}
