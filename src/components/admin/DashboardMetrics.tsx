'use client';
import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export interface MetricsProps {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
}

function MetricCard({ label, value }: { label: string; value: string | number }) {
  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Typography variant="subtitle2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="h6">{value}</Typography>
    </Paper>
  );
}

export default function DashboardMetrics({
  totalUsers,
  totalProducts,
  totalOrders,
  totalRevenue,
}: MetricsProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <MetricCard label="Usuários" value={totalUsers} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <MetricCard label="Produtos" value={totalProducts} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <MetricCard label="Pedidos" value={totalOrders} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <MetricCard label="Receita (R$)" value={totalRevenue.toFixed(2)} />
        </Grid>
      </Grid>
    </Box>
  );
}
