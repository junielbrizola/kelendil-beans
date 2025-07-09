// src/components/admin/dashboard/AdminDashboardContent.tsx
"use client";

import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "@mui/x-charts";
import type { DashboardStats } from "@/actions/admin/fetchDashboardStats";

interface Props {
  stats: DashboardStats;
}

export default function AdminDashboardContent({ stats }: Props) {
  const ordersCols: GridColDef[] = [
    { field: "id", headerName: "ID Pedido", flex: 1 },
    { field: "userId", headerName: "Usuário", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    {
      field: "totalAmount",
      headerName: "Total (R$)",
      flex: 1,
      valueFormatter: ({ value }) => value.toFixed(2)
    },
    {
      field: "createdAt",
      headerName: "Data",
      flex: 1,
      valueFormatter: ({ value }) =>
        new Date(value as string).toLocaleDateString()
    }
  ];

  return (
    <Box>
      {/* resumo */}
      <Grid container spacing={2} mb={4}>
        <Grid size={{ xs: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2">Total Pedidos</Typography>
              <Typography variant="h5">{stats.totalOrders}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2">Total Receita (R$)</Typography>
              <Typography variant="h5">
                {stats.totalRevenue.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2">
                Status de Pedidos
              </Typography>
              {stats.ordersByStatus.map((s) => (
                <Typography key={s.status}>
                  {s.status}: {s.count}
                </Typography>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* gráfico de receita */}
      <Box height={300} mb={4}>
        <Card sx={{ height: "100%" }}>
          <CardContent>
            <Typography variant="subtitle2" gutterBottom>
              Receita Últimos 7 Dias
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <LineChart data={stats.revenueByDay}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#1976d2"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Box>

      {/* tabela de pedidos recentes */}
      <Card>
        <CardContent>
          <Typography variant="subtitle2" gutterBottom>
            Últimos Pedidos
          </Typography>
          <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={stats.recentOrders}
              columns={ordersCols}
              getRowId={(row) => row.id}
              pageSizeOptions={[5]}
              initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
