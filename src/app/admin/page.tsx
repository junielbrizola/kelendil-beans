export const dynamic = 'auto';

import React, { Suspense } from 'react';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { fetchAdminMetricsAction } from '@/actions/admin/fetchMetrics';
import DashboardMetrics from '@/components/admin/DashboardMetrics';
import DashboardMetricsSkeleton from '@/components/ui/Skeleton/DashboardMetricsSkeleton';

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session || session?.user?.role !== 'ADMIN') {
    redirect('/');
  }
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard Administrativo
      </Typography>
      <Suspense fallback={<DashboardMetricsSkeleton />}>
        <AdminMetrics />
      </Suspense>
    </Container>
  );
}

async function AdminMetrics() {
  const result = await fetchAdminMetricsAction();
  if (!result.success || !result.data) {
    return <Typography color="error">Erro ao carregar métricas.</Typography>;
  }
  return <DashboardMetrics {...result.data} />;
}
