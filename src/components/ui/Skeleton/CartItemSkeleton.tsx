// src/components/cart/CartItemSkeleton.tsx
import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

export default function CartItemSkeleton() {
  return (
    <Paper elevation={1} sx={{ display: 'flex', alignItems: 'center', p: 2, mb: 2, borderRadius: 2 }}>
      <Box sx={{ width: 80, height: 80, mr: 2 }}>
        <Skeleton variant="rectangular" width="100%" height="100%" sx={{ borderRadius: 1 }} />
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Skeleton variant="text" width="60%" height={24} />
        <Skeleton variant="text" width="40%" height={20} />
        <Skeleton variant="text" width="40%" height={20} />
      </Box>
      <Box sx={{ width: 100, ml: 2 }}>
        <Skeleton variant="text" width="100%" height={40} />
      </Box>
      <Box sx={{ width: 40, ml: 1 }}>
        <Skeleton variant="circular" width={40} height={40} />
      </Box>
    </Paper>
  );
}
