'use server';
import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { fetchAdminStatsAction } from '@/actions/admin/fetchAdminStats';

export default async function Dashboard() {
  const result = await fetchAdminStatsAction();
  if (!result.success) {
    return <Typography color="error">{result.error.message}</Typography>;
  }
  const { productCount, orderCount, userCount, totalRevenue } = result.data;

  const stats = [
    { label: "Produtos Cadastrados", value: productCount },
    { label: "Pedidos", value: orderCount },
    { label: "Usuários", value: userCount },
    { label: "Receita (R$)", value: totalRevenue.toFixed(2) }
  ];

  return (
    <Grid container spacing={3}>
      {stats.map(({ label, value }) => (
        <Grid item xs={12} sm={6} md={3} key={label}>
          <Card sx={{ borderRadius: 2, boxShadow: 1 }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                {label}
              </Typography>
              <Typography variant="h5">{value}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
