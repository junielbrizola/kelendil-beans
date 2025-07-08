'use client';
import React from 'react';
import Container from '@mui/material/Container';
import DashboardMetricsSkeleton from '@/components/ui/Skeleton/DashboardMetricsSkeleton';

export default function AdminLoading() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <DashboardMetricsSkeleton />
    </Container>
  );
}
