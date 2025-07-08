// src/components/ui/Skeleton/ProfileSkeleton.tsx
import React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function ProfileSkeleton() {
  return (
    <Box sx={{ display: 'grid', gap: 2, maxWidth: 400, mx: 'auto' }}>
      <Skeleton variant="text" width="60%" sx={{ mb: 1, mx: 'auto' }} />
      <Skeleton variant="rectangular" height={56} />
      <Skeleton variant="rectangular" height={56} />
      <Skeleton variant="rectangular" height={36} width="40%" sx={{ mx: 'auto' }} />
    </Box>
  )
}