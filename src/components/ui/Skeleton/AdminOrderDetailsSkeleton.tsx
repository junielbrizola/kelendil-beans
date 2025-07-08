// src/components/ui/Skeleton/AdminOrderDetailsSkeleton.tsx
import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

export default function AdminOrderDetailsSkeleton() {
  return (
    <Box>
      <Box display="flex" alignItems="center" gap={2} sx={{ mb:3 }}>
        <Skeleton variant="rectangular" width={100} height={36} />
        <Skeleton variant="rectangular" width={140} height={36} />
      </Box>
      <Divider sx={{ mb:3 }} />
      {Array.from({ length: 4 }).map((_, i) => (
        <React.Fragment key={i}>
          <Skeleton variant="text" width="30%" />
          <Skeleton variant="rectangular" width="100%" height={24} sx={{ mb:2 }} />
        </React.Fragment>
      ))}
      <Divider sx={{ my:3 }} />
      {Array.from({ length: 2 }).map((_, i) => (
        <Skeleton key={i} variant="text" width="50%" sx={{ mb:1 }} />
      ))}
      <Divider sx={{ my:3 }} />
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} variant="text" width="40%" sx={{ mb:1 }} />
      ))}
    </Box>
  );
}
