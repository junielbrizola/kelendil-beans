/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import * as React from 'react';
import {
  Box, Card, CardContent, Typography, Stack, TextField, Button, Alert, Divider, Chip, CircularProgress,
} from '@mui/material';
import {
  Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent,
  TimelineDot, timelineItemClasses
} from '@mui/lab';

// Mock de eventos de rastreio (como Melhor Envio retorna)
const MOCK_TRACK = [
  {
    status: 'Pedido realizado',
    descricao: 'Seu pedido foi recebido com sucesso.',
    data: '2025-07-16 08:42',
    tipo: 'pedido',
  },
  {
    status: 'Pagamento aprovado',
    descricao: 'Pagamento processado via Mercado Pago.',
    data: '2025-07-16 09:11',
    tipo: 'pagamento',
  },
  {
    status: 'Separando para envio',
    descricao: 'Estamos embalando seu pedido.',
    data: '2025-07-16 13:30',
    tipo: 'preparacao',
  },
  {
    status: 'Enviado',
    descricao: 'Seu pedido foi despachado via Correios (SEDEX).',
    data: '2025-07-17 10:05',
    tipo: 'envio',
  },
  {
    status: 'Saiu para entrega',
    descricao: 'O pedido está em rota de entrega.',
    data: '2025-07-18 07:25',
    tipo: 'roteiro',
  },
  {
    status: 'Entregue',
    descricao: 'Pedido entregue ao destinatário.',
    data: '2025-07-18 12:12',
    tipo: 'entrega',
  },
];

// Opção para escolher ícone/cor de status
function statusColor(tipo?: string) {
  switch (tipo) {
    case 'pedido': return 'info';
    case 'pagamento': return 'primary';
    case 'preparacao': return 'warning';
    case 'envio': return 'secondary';
    case 'roteiro': return 'inherit';
    case 'entrega': return 'success';
    default: return 'inherit';
  }
}

export default function RastreamentoPedidoPage() {
  const [codigo, setCodigo] = React.useState('');
  const [buscando, setBuscando] = React.useState(false);
  const [eventos, setEventos] = React.useState<typeof MOCK_TRACK | null>(null);
  const [erro, setErro] = React.useState<string | null>(null);

  // Simula busca
  async function buscarRastreio() {
    setBuscando(true);
    setErro(null);
    // Chame sua API Melhor Envio, Correios etc aqui
    await new Promise(r => setTimeout(r, 1000));
    if (!codigo || codigo.length < 6) {
      setErro('Digite um código de rastreio válido.');
      setEventos(null);
    } else if (codigo !== 'BR123456789') {
      setErro('Código não encontrado ou ainda não disponível.');
      setEventos(null);
    } else {
      setEventos(MOCK_TRACK);
    }
    setBuscando(false);
  }

  return (
    <Box sx={{ maxWidth: 650, mx: 'auto', py: 5 }}>
      <Card>
        <CardContent>
          <Stack spacing={2} alignItems="center">
            <Typography variant="h5" gutterBottom>Rastrear pedido</Typography>
            <Stack direction="row" spacing={1} width="100%">
              <TextField
                label="Código de rastreio"
                value={codigo}
                onChange={e => setCodigo(e.target.value.toUpperCase())}
                sx={{ flex: 1 }}
                inputProps={{ maxLength: 30 }}
              />
              <Button
                onClick={buscarRastreio}
                disabled={buscando || !codigo}
                variant="contained"
                sx={{ minWidth: 140 }}
              >
                {buscando ? <CircularProgress size={22} /> : 'Rastrear'}
              </Button>
            </Stack>
            {erro && <Alert severity="error" sx={{ width: '100%' }}>{erro}</Alert>}
            <Divider sx={{ my: 2, width: '100%' }} />
            {eventos && (
              <Box sx={{ width: '100%', mt: 1 }}>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                  <Chip label={codigo} color="primary" />
                  <Chip label={`Status: ${eventos[eventos.length - 1].status}`} color={statusColor(eventos[eventos.length - 1]?.tipo) as any} />
                </Stack>
                <Timeline
                  sx={{
                    [`& .${timelineItemClasses.root}:before`]: { flex: 0, padding: 0 },
                  }}
                >
                  {eventos.slice().reverse().map((ev, idx, arr) => (
                    <TimelineItem key={ev.status + ev.data}>
                      <TimelineSeparator>
                        <TimelineDot color={statusColor(ev.tipo)} />
                        {idx < arr.length - 1 && <TimelineConnector />}
                      </TimelineSeparator>
                      <TimelineContent>
                        <Typography variant="subtitle2" color="text.primary">{ev.status}</Typography>
                        <Typography variant="body2" color="text.secondary">{ev.descricao}</Typography>
                        <Typography variant="caption" color="text.disabled">{ev.data}</Typography>
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                </Timeline>
                <Alert severity={eventos[eventos.length - 1].tipo === 'entrega' ? 'success' : 'info'} sx={{ mt: 3 }}>
                  {eventos[eventos.length - 1].tipo === 'entrega'
                    ? 'Pedido entregue. Obrigado por comprar com a gente!'
                    : 'Seu pedido está em andamento. Aguarde novas atualizações.'}
                </Alert>
              </Box>
            )}
            {!eventos && !erro && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Digite o código de rastreio para ver o status do seu pedido.
              </Typography>
            )}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
