'use client';
import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function LoginLoading() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          maxWidth: 360,
          mx: 'auto',
          mt: 8,
          p: 4,
          display: 'grid',
          gap: 2,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <Skeleton variant="text" width="60%" height={32} sx={{ mx: 'auto' }} />
        <Skeleton variant="rectangular" height={56} />
        <Skeleton variant="rectangular" height={56} />
        <Skeleton variant="rectangular" height={36} width="50%" sx={{ mx: 'auto' }} />
      </Box>
    </Container>
  );
}
