// src/components/ui/Skeleton/CheckoutSkeleton.tsx
import React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function CheckoutSkeleton() {
  return (
    <Box>
      {['endereço','CEP','frete','serviço'].map((_,i) => (
        <Skeleton key={i} variant="rectangular" height={56} sx={{ mb:2 }} />
      ))}
      <Box textAlign="right" mt={4}>
        <Skeleton variant="rectangular" width={240} height={48} />
      </Box>
    </Box>
  );
}
