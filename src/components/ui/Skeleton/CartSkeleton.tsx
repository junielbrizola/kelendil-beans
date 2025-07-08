import React from 'react';
import Box from '@mui/material/Box';
import CartItemSkeleton from '@/components/ui/Skeleton/CartItemSkeleton';

export default function CartSkeleton() {
  return (
    <Box>
      {Array.from({ length: 3 }).map((_, i) => (
        <Box key={i} sx={{ mb: 2 }}>
          <CartItemSkeleton />
        </Box>
      ))}
    </Box>
  );
}
