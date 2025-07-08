'use client';
import React from 'react';
import Container from '@mui/material/Container';
import ProfileSkeleton from '@/components/ui/Skeleton/ProfileSkeleton';

export default function ProfileLoading() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <ProfileSkeleton />
    </Container>
  );
}
