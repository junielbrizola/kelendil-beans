import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';

export default function DashboardMetricsSkeleton() {
  return (
    <Grid container spacing={3}>
      {[...Array(4)].map((_, i) => (
        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Skeleton variant="text" width="40%" height={20} sx={{ mb: 1 }} />
            <Skeleton variant="text" width="60%" height={28} />
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
