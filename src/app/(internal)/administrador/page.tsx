/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import * as React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Stack,
  Tooltip,
  IconButton,
} from '@mui/material';
import { LineChart } from '@mui/x-charts';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ContentCopyRounded } from '@mui/icons-material';

export default function AdministradorPage() {
  const columns: GridColDef[] = [
    { field: 'orderNumber', headerName: 'Número do pedido', width: 140 },
    { field: 'date', headerName: 'Data', width: 120 },
    {
      field: 'customer',
      headerName: 'Nome/E-mail do cliente',
      flex: 1,
      minWidth: 220,
      renderCell: (params: any) => {
        console.log({ params })
        return `${params?.row?.customer} (${params?.row?.email})`
      },
    },
    {
      field: 'total',
      headerName: 'Valor total',
      type: 'number',
      width: 120,
      valueFormatter: ({ value }: any) => `R$ ${value?.toFixed(2) || '0,00'}`,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
    },
    {
      field: 'tracking',
      headerName: 'Código de rastreio',
      width: 160,
      renderCell: (params) =>
        params.value ? (
          <Stack direction="row" spacing={1} alignItems="center">
            <span>{params.value}</span>
            <Tooltip title="Copiar código">
              <IconButton size="small" onClick={() => navigator.clipboard.writeText(params.value)}>
                <ContentCopyRounded fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        ) : (
          <span style={{ color: '#888' }}>Não gerado</span>
        ),
    },
  ];

  const rows = [
    {
      id: 1,
      orderNumber: '1001',
      date: '2025-07-16',
      customer: 'Jon Snow',
      email: 'jon@snow.com',
      total: 200.5,
      status: 'Pago',
      tracking: 'BR123456789',
    },
    {
      id: 2,
      orderNumber: '1002',
      date: '2025-07-15',
      customer: 'Arya Stark',
      email: 'arya@stark.com',
      total: 120.0,
      status: 'Aguardando',
      tracking: '',
    },
  ];

  return (
    <Box sx={{ px: { xs: 1, md: 4 }, py: 3, width: '100%', maxWidth: '1440px', mx: 'auto' }}>
      <Grid container spacing={2}>
        {[
          { title: 'Vendas hoje', value: '0' },
          { title: 'Pedidos em aberto', value: '0' },
          { title: 'Pedidos enviados hoje', value: '0' },
          { title: 'Cacaus com Estoque Baixo', value: '0' },
        ].map((card) => (
          <Grid
            key={card.title}
            size={{ xs: 12, sm: 6, md: 3 }}
          >
            <Card>
              <CardHeader
                title={
                  <Typography variant="subtitle2" sx={{ textAlign: 'center' }}>
                    {card.title}
                  </Typography>
                }
                sx={{ pb: 0 }}
              />
              <CardContent
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: 80,
                }}
              >
                <Typography variant="h3" sx={{ textAlign: 'center' }}>
                  {card.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Gráfico de Vendas */}
      <Box mt={4}>
        <Card>
          <CardHeader
            title={
              <Typography variant="subtitle2" sx={{ textAlign: 'center' }}>
                Vendas de cacaus (últimos 6 dias)
              </Typography>
            }
            sx={{ pb: 0 }}
          />
          <CardContent>
            <LineChart
              xAxis={[{ data: [1, 2, 3, 5, 8, 10], label: 'Dia' }]}
              series={[
                { data: [2, 5.5, 2, 8.5, 1.5, 5], label: 'R$ Vendido' },
              ]}
              height={300}
            />
          </CardContent>
        </Card>
      </Box>

      {/* Pedidos Recentes */}
      <Box mt={4}>
        <Card>
          <CardHeader
            title={
              <Typography variant="subtitle2" sx={{ textAlign: 'center' }}>
                Pedidos Recentes
              </Typography>
            }
            sx={{ pb: 0 }}
          />
          <CardContent>
            <DataGrid
              rows={rows}
              columns={columns}
              hideFooter
              disableRowSelectionOnClick
              sx={{ background: 'white' }}
            />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
