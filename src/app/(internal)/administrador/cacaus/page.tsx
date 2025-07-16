'use client';

import * as React from 'react';
import {
  Box, Card, CardContent, CardHeader, Typography, Stack, Button,
  Grid, IconButton, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, MenuItem, Chip, Avatar, Divider, Fade, Alert, InputAdornment
} from '@mui/material';
import { AddRounded, EditRounded, DeleteRounded, GrainRounded, EmojiNatureRounded, Inventory2Rounded } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';

type FormatoCacau = 'Pó' | 'Grão';
type TamanhoCacau = '1kg' | '500g';
type SaborCacau = 'Leve' | 'Médio' | 'Médio Escuro' | 'Escuro';

const FORMATOS: FormatoCacau[] = ['Pó', 'Grão'];
const TAMANHOS: TamanhoCacau[] = ['1kg', '500g'];
const SABORES: SaborCacau[] = ['Leve', 'Médio', 'Médio Escuro', 'Escuro'];

interface VarianteSabor {
  id: string;
  sabor: SaborCacau;
  descricao: string;
  precoKg: number;
  formatos: {
    formato: FormatoCacau;
    tamanhos: { tamanho: TamanhoCacau; preco: number }[];
  }[];
}

interface Cacau {
  id: string;
  nome: string;
  estoqueKg: number;
  variantes: VarianteSabor[];
}

const MOCK_CACAUS: Cacau[] = [
  {
    id: 'ccn51',
    nome: 'CCN-51',
    estoqueKg: 15,
    variantes: [
      {
        id: 'ccn51-leve',
        sabor: 'Leve',
        descricao: 'Sabor suave, notas florais.',
        precoKg: 60,
        formatos: [
          {
            formato: 'Pó',
            tamanhos: [
              { tamanho: '1kg', preco: 60 },
              { tamanho: '500g', preco: 32 }
            ]
          },
          {
            formato: 'Grão',
            tamanhos: [
              { tamanho: '1kg', preco: 62 },
              { tamanho: '500g', preco: 33 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'catongo',
    nome: 'Catongo',
    estoqueKg: 8,
    variantes: []
  },
  {
    id: 'amelonado',
    nome: 'Amelonado',
    estoqueKg: 5,
    variantes: []
  }
];

function cacauColor(nome: string) {
  if (nome.toLowerCase().includes('ccn')) return '#fdb813';
  if (nome.toLowerCase().includes('catongo')) return '#d77b53';
  if (nome.toLowerCase().includes('amelonado')) return '#64c07c';
  return '#7986cb';
}

function saborColor(sabor: SaborCacau) {
  switch (sabor) {
    case 'Leve': return 'info';
    case 'Médio': return 'primary';
    case 'Médio Escuro': return 'warning';
    case 'Escuro': return 'error';
    default: return 'default';
  }
}

export default function CacausAdminPage() {
  const [cacaus, setCacaus] = React.useState<Cacau[]>(MOCK_CACAUS);
  const [selectedCacau, setSelectedCacau] = React.useState<Cacau | null>(null);
  const [openSabor, setOpenSabor] = React.useState(false);
  const [editingSabor, setEditingSabor] = React.useState<VarianteSabor | null>(null);
  const [openCacau, setOpenCacau] = React.useState(false);
  const [editCacau, setEditCacau] = React.useState<string | null>(null);
  const [alert, setAlert] = React.useState<string | null>(null);

  // ---- FORM CACAU ----
  const cacauForm = useForm<{ nome: string; estoqueKg: number }>({
    defaultValues: { nome: '', estoqueKg: 0 }
  });

  // Modal de cacau: abrir/editar
  function handleOpenCacau(editId?: string) {
    setEditCacau(editId ?? null);
    if (editId) {
      const c = cacaus.find((x) => x.id === editId)!;
      cacauForm.reset({ nome: c.nome, estoqueKg: c.estoqueKg });
    } else {
      cacauForm.reset({ nome: '', estoqueKg: 0 });
    }
    setOpenCacau(true);
  }

  // Adicionar/editar cacau
  function onSubmitCacau(data: { nome: string; estoqueKg: number }) {
    if (editCacau) {
      setCacaus((c) =>
        c.map((x) =>
          x.id === editCacau ? { ...x, nome: data.nome, estoqueKg: data.estoqueKg } : x
        )
      );
      setAlert('Cacau atualizado!');
    } else {
      setCacaus((c) => [
        ...c,
        { id: Math.random().toString(36).slice(2), nome: data.nome, estoqueKg: data.estoqueKg, variantes: [] }
      ]);
      setAlert('Cacau cadastrado!');
    }
    setOpenCacau(false);
    setEditCacau(null);
    setTimeout(() => setAlert(null), 1800);
  }

  // Remover cacau
  function removeCacau(id: string) {
    if (!window.confirm('Remover esse cacau? Todos os sabores serão apagados.')) return;
    setCacaus((c) => c.filter((x) => x.id !== id));
    setAlert('Cacau removido!');
    setTimeout(() => setAlert(null), 1800);
  }

  // ---- FORM SABOR ----
  const { control, handleSubmit, reset } = useForm<VarianteSabor>({
    defaultValues: {
      id: '',
      sabor: '' as SaborCacau,
      descricao: '',
      precoKg: 0,
      formatos: FORMATOS.map((formato) => ({
        formato,
        tamanhos: TAMANHOS.map((tamanho) => ({
          tamanho,
          preco: 0
        }))
      }))
    }
  });

  // Modal de sabor
  function openSaborModal(cacau: Cacau, sabor?: VarianteSabor) {
    setSelectedCacau(cacau);
    setEditingSabor(sabor ?? null);
    reset(
      sabor
        ? sabor
        : {
            id: '',
            sabor: '' as SaborCacau,
            descricao: '',
            precoKg: 0,
            formatos: FORMATOS.map((formato) => ({
              formato,
              tamanhos: TAMANHOS.map((tamanho) => ({
                tamanho,
                preco: 0
              }))
            }))
          }
    );
    setOpenSabor(true);
  }

  function onSubmitSabor(data: VarianteSabor) {
    if (!selectedCacau) return;
    setCacaus((cacaus) =>
      cacaus.map((c) =>
        c.id === selectedCacau.id
          ? {
              ...c,
              variantes: editingSabor
                ? c.variantes.map((v) => (v.id === editingSabor.id ? { ...data, id: editingSabor.id } : v))
                : [...c.variantes, { ...data, id: Math.random().toString(36).slice(2) }]
            }
          : c
      )
    );
    setOpenSabor(false);
    setEditingSabor(null);
    setAlert(editingSabor ? 'Sabor atualizado!' : 'Sabor cadastrado!');
    setTimeout(() => setAlert(null), 1800);
  }

  // Remover sabor
  function removeSabor(cacauId: string, saborId: string) {
    if (!window.confirm('Remover esse sabor?')) return;
    setCacaus((cacaus) =>
      cacaus.map((c) =>
        c.id === cacauId
          ? { ...c, variantes: c.variantes.filter((v) => v.id !== saborId) }
          : c
      )
    );
    setAlert('Sabor removido!');
    setTimeout(() => setAlert(null), 1800);
  }

  return (
    <Box sx={{ px: { xs: 1, md: 4 }, py: 3, maxWidth: '1440px', mx: 'auto' }}>
      <Fade in={!!alert}>
        <Box sx={{ position: 'fixed', top: 80, right: 32, zIndex: 10, minWidth: 200 }}>
          {alert && <Alert severity="success">{alert}</Alert>}
        </Box>
      </Fade>

      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Cacaus</Typography>
        <Button startIcon={<AddRounded />} variant="contained" onClick={() => handleOpenCacau()}>
          Novo Cacau
        </Button>
      </Stack>

      <Grid container spacing={3}>
        {cacaus.map((cacau) => (
          <Grid key={cacau.id} size={3}>
            <Card
              sx={{
                borderTop: `6px solid ${cacauColor(cacau.nome)}`,
                minHeight: 280,
                boxShadow: 3,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <CardHeader
                avatar={
                  <Avatar sx={{
                    bgcolor: cacauColor(cacau.nome),
                    color: '#fff',
                    width: 48,
                    height: 48,
                    fontSize: 28
                  }}>
                    <GrainRounded />
                  </Avatar>
                }
                title={
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="h6" color="text.primary">{cacau.nome}</Typography>
                    <Chip
                      icon={<Inventory2Rounded />}
                      label={`${cacau.estoqueKg} kg`}
                      color={cacau.estoqueKg === 0 ? 'default' : cacau.estoqueKg < 10 ? 'warning' : 'success'}
                      size="small"
                      sx={{ fontWeight: 600, ml: 1 }}
                    />
                  </Stack>
                }
                action={
                  <Stack direction="row" spacing={1}>
                    <Tooltip title="Editar cacau">
                      <IconButton onClick={() => handleOpenCacau(cacau.id)}><EditRounded /></IconButton>
                    </Tooltip>
                    <Tooltip title="Remover cacau">
                      <IconButton color="error" onClick={() => removeCacau(cacau.id)}><DeleteRounded /></IconButton>
                    </Tooltip>
                  </Stack>
                }
                sx={{ pb: 0 }}
              />
              <CardContent sx={{ pt: 0 }}>
                <Stack spacing={1}>
                  {cacau.variantes.length === 0 && (
                    <Typography color="text.secondary" variant="body2" sx={{ mb: 1 }}>Nenhum sabor cadastrado.</Typography>
                  )}
                  {cacau.variantes.map((v) => (
                    <Card key={v.id} variant="outlined" sx={{ mb: 1, borderRadius: 2, p: 1, bgcolor: "#fafafa" }}>
                      <Stack direction="row" alignItems="center" spacing={1} mb={0.5}>
                        <Chip
                          label={v.sabor}
                          color={saborColor(v.sabor)}
                          size="small"
                          sx={{ fontWeight: 600 }}
                        />
                        <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
                          {v.descricao}
                        </Typography>
                        <Tooltip title="Editar sabor">
                          <IconButton size="small" color="primary" onClick={() => openSaborModal(cacau, v)}><EditRounded /></IconButton>
                        </Tooltip>
                        <Tooltip title="Remover sabor">
                          <IconButton size="small" color="error" onClick={() => removeSabor(cacau.id, v.id)}><DeleteRounded /></IconButton>
                        </Tooltip>
                      </Stack>
                      <Divider sx={{ mb: 1 }} />
                      <Stack direction="row" alignItems="center" spacing={2} mb={0.5}>
                        <Chip
                          icon={<EmojiNatureRounded fontSize="small" />}
                          label={`Base kg: R$ ${Number(v?.precoKg || 0)?.toFixed(2)}`}
                          color="success"
                          size="small"
                        />
                        {v.formatos.map((f) => (
                          <Chip key={f.formato} label={f.formato} color={f.formato === 'Pó' ? 'secondary' : 'primary'} size="small" />
                        ))}
                      </Stack>
                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        {v.formatos.map((f) =>
                          f.tamanhos.map((t) => (
                            <Chip
                              key={f.formato + t.tamanho}
                              label={`${f.formato} - ${t.tamanho}: R$ ${Number(t?.preco || 0)?.toFixed(2)}`}
                              size="small"
                              sx={{ mb: 0.5 }}
                            />
                          ))
                        )}
                      </Stack>
                    </Card>
                  ))}
                </Stack>
                <Button
                  startIcon={<AddRounded />}
                  size="small"
                  variant="outlined"
                  sx={{ mt: 2 }}
                  onClick={() => openSaborModal(cacau)}
                  fullWidth
                >
                  Novo Sabor
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal de cadastro/edição de cacau */}
      <Dialog open={openCacau} onClose={() => setOpenCacau(false)} maxWidth="xs" fullWidth>
        <DialogTitle>{editCacau ? 'Editar Cacau' : 'Novo Cacau'}</DialogTitle>
        <form onSubmit={cacauForm.handleSubmit(onSubmitCacau)}>
          <DialogContent>
            <Stack spacing={2}>
              <Controller
                name="nome"
                control={cacauForm.control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField {...field} label="Nome do cacau" fullWidth required autoFocus />
                )}
              />
              <Controller
                name="estoqueKg"
                control={cacauForm.control}
                rules={{ required: true, min: 0 }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    label="Estoque (kg)"
                    fullWidth
                    required
                    inputProps={{ min: 0, step: 1 }}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">kg</InputAdornment>
                    }}
                  />
                )}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenCacau(false)}>Cancelar</Button>
            <Button type="submit" variant="contained">{editCacau ? 'Salvar' : 'Cadastrar'}</Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Modal de cadastro/edição de variante de sabor */}
      <Dialog open={openSabor} onClose={() => setOpenSabor(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingSabor ? 'Editar Sabor' : 'Novo Sabor'}</DialogTitle>
        <form onSubmit={handleSubmit(onSubmitSabor)}>
          <DialogContent>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
              Informações do Sabor
            </Typography>
            <Grid container spacing={2}>
              <Grid size={6}>
                <Controller
                  name="sabor"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField {...field} select label="Sabor" fullWidth required disabled={!!editingSabor}>
                      {SABORES.map((s) => (
                        <MenuItem key={s} value={s}>{s}</MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>
              <Grid size={6}>
                <Controller
                  name="precoKg"
                  control={control}
                  rules={{ required: true, min: 0 }}
                  render={({ field }) => (
                    <TextField {...field} type="number" label="Preço base do kg" fullWidth required inputProps={{ min: 0, step: 0.01 }} />
                  )}
                />
              </Grid>
              <Grid size={12}>
                <Controller
                  name="descricao"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField {...field} label="Descrição do sabor" fullWidth multiline required />
                  )}
                />
              </Grid>
            </Grid>
            <Divider sx={{ my: 3 }} />
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
              Preços por Formato e Tamanho
            </Typography>
            {FORMATOS.map((formato, i) => (
              <Box key={formato} sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>{formato}</Typography>
                <Stack direction="row" spacing={2}>
                  {TAMANHOS.map((tamanho, j) => (
                    <Controller
                      key={tamanho}
                      name={`formatos.${i}.tamanhos.${j}.preco` as const}
                      control={control}
                      rules={{ required: true, min: 0 }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label={`${tamanho} (R$)`}
                          type="number"
                          size="small"
                          sx={{ width: 130 }}
                          inputProps={{ min: 0, step: 0.01 }}
                        />
                      )}
                    />
                  ))}
                </Stack>
              </Box>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenSabor(false)}>Cancelar</Button>
            <Button type="submit" variant="contained">{editingSabor ? 'Salvar' : 'Cadastrar'}</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
