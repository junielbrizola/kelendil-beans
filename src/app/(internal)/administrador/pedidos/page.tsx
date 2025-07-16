/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import * as React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Stack,
  Tooltip,
  IconButton,
  Chip,
  TextField,
  MenuItem,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ContentCopyRounded, SendRounded, VisibilityRounded } from '@mui/icons-material';

const MOCK_PEDIDOS = [
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
  {
    id: 3,
    orderNumber: '1003',
    date: '2025-07-14',
    customer: 'Daenerys Targaryen',
    email: 'dany@dragon.com',
    total: 400.0,
    status: 'Enviado',
    tracking: 'BR987654321',
  },
  // Adicione mais pedidos conforme crescer o seu negócio!
];

const STATUS_LIST = ['Todos', 'Aguardando', 'Pago', 'Enviado', 'Entregue', 'Cancelado'];

export default function PedidosAdminPage() {
  const [statusFiltro, setStatusFiltro] = React.useState('Todos');
  const [busca, setBusca] = React.useState('');
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Filtro client-side para busca e status
  const rows = MOCK_PEDIDOS.filter((row) =>
    (statusFiltro === 'Todos' || row.status === statusFiltro) &&
    (
      row.orderNumber.includes(busca) ||
      row.customer.toLowerCase().includes(busca.toLowerCase()) ||
      row.email.toLowerCase().includes(busca.toLowerCase())
    )
  );

  const columns: GridColDef[] = [
    { field: 'orderNumber', headerName: 'Nº Pedido', width: 120 },
    { field: 'date', headerName: 'Data', width: 110 },
    {
      field: 'customer',
      headerName: 'Cliente',
      flex: 1,
      minWidth: 180,
      renderCell: (params) => `${params.row.customer} (${params.row.email})`,
    },
    {
      field: 'total',
      headerName: 'Valor',
      type: 'number',
      width: 110,
      valueFormatter: ({ value }: any) => `R$ ${value?.toFixed(2) || '0,00'}`,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 110,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={
            params.value === 'Pago' ? 'success'
              : params.value === 'Enviado' ? 'primary'
                : params.value === 'Entregue' ? 'default'
                  : params.value === 'Cancelado' ? 'error'
                    : 'warning'
          }
          size="small"
        />
      ),
    },
    {
      field: 'tracking',
      headerName: 'Rastreio',
      width: 170,
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
    {
      field: 'actions',
      headerName: 'Ações',
      width: 170,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Ver detalhes">
            <IconButton
              color="primary"
              size="small"
              onClick={() => alert(`Ver detalhes do pedido ${params.row.orderNumber}`)}
            >
              <VisibilityRounded fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Reenviar notificação">
            <span>
              <IconButton
                color="secondary"
                size="small"
                disabled={!params.row.tracking}
                onClick={() => alert(`Reenviar notificação do pedido ${params.row.orderNumber}`)}
              >
                <SendRounded fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  // Barra de filtros
  function CustomToolbar() {
    return (
      <Stack direction="row" spacing={2} mb={2} alignItems="center" flexWrap="wrap">
        <TextField
          label="Buscar pedido, cliente ou email"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          size="small"
          sx={{ minWidth: 220 }}
        />
        <TextField
          select
          label="Status"
          value={statusFiltro}
          onChange={(e) => setStatusFiltro(e.target.value)}
          size="small"
          sx={{ minWidth: 150 }}
        >
          {STATUS_LIST.map((status) => (
            <MenuItem key={status} value={status}>{status}</MenuItem>
          ))}
        </TextField>
      </Stack>
    );
  }

  return (
    <Box sx={{ px: { xs: 1, md: 4 }, py: 3, width: '100%', mx: 'auto' }}>
      <Card>
        <CardHeader
          title={<Typography variant="h5" sx={{ textAlign: 'center' }}>Pedidos</Typography>}
          sx={{ pb: 0 }}
        />
        <CardContent>
          <CustomToolbar />
          {mounted && (
            <DataGrid
              rows={rows}
              columns={columns}
              autoPageSize
              hideFooter
              disableRowSelectionOnClick
              sx={{ background: 'white', borderRadius: 2, minHeight: 400 }}
            />
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
