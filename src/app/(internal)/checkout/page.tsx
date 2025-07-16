'use client';

import * as React from 'react';
import {
  Box, Card, CardContent, Typography, Button, Stepper, Step, StepLabel, Stack, Alert, TextField, Divider,
  RadioGroup, FormControlLabel, Radio, Chip, CircularProgress
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

// MOCKS
const MOCK_CARRINHO = [
  {
    id: 'item1',
    cacau: 'CCN-51',
    sabor: 'Leve',
    formato: 'Pó',
    tamanho: '1kg',
    preco: 60,
    quantidade: 2,
  },
  {
    id: 'item2',
    cacau: 'Catongo',
    sabor: 'Escuro',
    formato: 'Grão',
    tamanho: '500g',
    preco: 33,
    quantidade: 1,
  },
];

const MOCK_FRETES = [
  {
    id: 'melhorenvio-normal',
    nome: 'PAC - Correios',
    prazo: '6 dias úteis',
    valor: 27.99,
  },
  {
    id: 'melhorenvio-expresso',
    nome: 'SEDEX - Correios',
    prazo: '2 dias úteis',
    valor: 41.50,
  },
];

// Subtotal do carrinho
function calcularSubtotal() {
  return MOCK_CARRINHO.reduce((total, item) => total + item.preco * item.quantidade, 0);
}

const steps = ['Seus Dados', 'Entrega', 'Revisão', 'Pagamento', 'Confirmação'];

// -------- COMPONENTE PRINCIPAL ----------
export default function CheckoutStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [fretes, setFretes] = React.useState(MOCK_FRETES);
  const [calculando, setCalculando] = React.useState(false);
  const [alert, setAlert] = React.useState<string | null>(null);
  const [pagamentoLoading, setPagamentoLoading] = React.useState(false);
  const [paymentOk, setPaymentOk] = React.useState(false);
  const [preferenceId, setPreferenceId] = React.useState<string | null>(null);

  // Formulários para dados pessoais e entrega
  const {
    control,
    watch,
    setValue,
    trigger,
    formState: { errors }
  } = useForm({
    defaultValues: {
      nome: '',
      email: '',
      cpf: '',
      telefone: '',
      cep: '',
      endereco: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      uf: '',
      frete: '',
    }
  });

  // Mock: buscar endereço por CEP
  async function buscarEnderecoPorCep(cep: string) {
    console.log({ cep })
    setValue('endereco', 'Rua dos Cacaus');
    setValue('bairro', 'Centro');
    setValue('cidade', 'Novo Hamburgo');
    setValue('uf', 'RS');
  }

  // Mock: calcular frete
  async function calcularFrete() {
    setCalculando(true);
    await new Promise(r => setTimeout(r, 800));
    setFretes(MOCK_FRETES);
    setCalculando(false);
    setAlert('Fretes atualizados!');
    setTimeout(() => setAlert(null), 2000);
  }

  // Navegação dos passos
  const handleNext = async () => {
    // Valida o formulário da etapa atual antes de avançar
    if (activeStep === 0) {
      const ok = await trigger(['nome', 'email', 'cpf', 'telefone']);
      if (!ok) return;
    }
    if (activeStep === 1) {
      const ok = await trigger(['cep', 'endereco', 'numero', 'bairro', 'cidade', 'uf', 'frete']);
      if (!ok) return;
    }
    if (activeStep === 3) {
      // Simula pagamento aprovado
      setPagamentoLoading(true);
      await new Promise(r => setTimeout(r, 1800));
      setPaymentOk(true);
      setPagamentoLoading(false);
    }
    setActiveStep((prev) => prev + 1);
  };
  const handleBack = () => setActiveStep((prev) => prev - 1);

  // Mercado Pago simulado: preferenceId
  const iniciarPagamento = async () => {
    setPagamentoLoading(true);
    await new Promise(r => setTimeout(r, 1300));
    setPreferenceId('PREFERENCE_ID_EXEMPLO_123456');
    setPagamentoLoading(false);
  };

  const subtotal = calcularSubtotal();
  const valorFrete = fretes.find(f => f.id === watch('frete'))?.valor ?? 0;
  const total = subtotal + valorFrete;

  return (
    <Box sx={{ maxWidth: 880, mx: 'auto', py: 4 }}>
      <Card>
        <CardContent>
          <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* Step 0: Dados do comprador */}
          {activeStep === 0 && (
            <form autoComplete="off">
              <Stack spacing={2}>
                <Typography variant="h6">Seus dados</Typography>
                <Controller
                  name="nome"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField {...field} label="Nome completo" fullWidth error={!!errors.nome} required />
                  )}
                />
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField {...field} type="email" label="E-mail" fullWidth error={!!errors.email} required />
                  )}
                />
                <Controller
                  name="cpf"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField {...field} label="CPF" fullWidth error={!!errors.cpf} required />
                  )}
                />
                <Controller
                  name="telefone"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField {...field} label="Telefone" fullWidth error={!!errors.telefone} required />
                  )}
                />
                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                  <Button onClick={handleNext} variant="contained">Próximo</Button>
                </Box>
              </Stack>
            </form>
          )}

          {/* Step 1: Endereço */}
          {activeStep === 1 && (
            <form autoComplete="off">
              <Stack spacing={2}>
                <Typography variant="h6">Endereço de entrega</Typography>
                <Stack direction="row" spacing={1}>
                  <Controller
                    name="cep"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TextField {...field} label="CEP" fullWidth error={!!errors.cep} required />
                    )}
                  />
                  <Button
                    onClick={() => {
                      buscarEnderecoPorCep(watch('cep'));
                      calcularFrete();
                    }}
                    variant="outlined"
                    sx={{ whiteSpace: 'nowrap', minWidth: 120 }}
                    disabled={calculando || !watch('cep')}
                  >
                    {calculando ? <CircularProgress size={18} /> : 'Buscar Endereço'}
                  </Button>
                </Stack>
                <Controller
                  name="endereco"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField {...field} label="Endereço" fullWidth error={!!errors.endereco} required />
                  )}
                />
                <Stack direction="row" spacing={1}>
                  <Controller
                    name="numero"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TextField {...field} label="Número" fullWidth error={!!errors.numero} required />
                    )}
                  />
                  <Controller
                    name="complemento"
                    control={control}
                    render={({ field }) => (
                      <TextField {...field} label="Complemento" fullWidth />
                    )}
                  />
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Controller
                    name="bairro"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TextField {...field} label="Bairro" fullWidth error={!!errors.bairro} required />
                    )}
                  />
                  <Controller
                    name="cidade"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TextField {...field} label="Cidade" fullWidth error={!!errors.cidade} required />
                    )}
                  />
                  <Controller
                    name="uf"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TextField {...field} label="UF" fullWidth error={!!errors.uf} required />
                    )}
                  />
                </Stack>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6">Entrega</Typography>
                {calculando ? (
                  <CircularProgress size={26} />
                ) : (
                  <RadioGroup
                    value={watch('frete')}
                    onChange={(e) => setValue('frete', e.target.value)}
                  >
                    {fretes.map((f) => (
                      <FormControlLabel
                        key={f.id}
                        value={f.id}
                        control={<Radio required />}
                        label={
                          <Stack direction="row" spacing={2} alignItems="center">
                            <Typography variant="body2">{f.nome}</Typography>
                            <Chip label={f.prazo} size="small" color="default" />
                            <Chip label={`R$ ${f.valor.toFixed(2)}`} color="success" size="small" />
                          </Stack>
                        }
                        sx={{ mb: 1 }}
                      />
                    ))}
                  </RadioGroup>
                )}
                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                  <Button onClick={handleBack}>Voltar</Button>
                  <Button onClick={handleNext} variant="contained">Próximo</Button>
                </Box>
              </Stack>
            </form>
          )}

          {/* Step 2: Revisão */}
          {activeStep === 2 && (
            <Stack spacing={2}>
              <Typography variant="h6">Revisão do Pedido</Typography>
              <Card variant="outlined" sx={{ mb: 3 }}>
                <CardContent>
                  <Stack spacing={2}>
                    {MOCK_CARRINHO.map((item) => (
                      <Stack
                        key={item.id}
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ borderBottom: '1px dashed #eee', pb: 1 }}
                      >
                        <Box>
                          <Typography variant="subtitle2">{item.cacau} - {item.sabor}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.formato}, {item.tamanho} &nbsp;
                            <b>x{item.quantidade}</b>
                          </Typography>
                        </Box>
                        <Typography variant="subtitle2">
                          R$ {(item.preco * item.quantidade).toFixed(2)}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                  <Divider sx={{ my: 2 }} />
                  <Stack direction="row" justifyContent="space-between">
                    <Typography>Subtotal:</Typography>
                    <Typography>R$ {subtotal.toFixed(2)}</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography>Frete:</Typography>
                    <Typography>R$ {valorFrete ? valorFrete.toFixed(2) : '--'}</Typography>
                  </Stack>
                  <Divider sx={{ my: 2 }} />
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="h6">Total:</Typography>
                    <Typography variant="h6" color="primary">R$ {total.toFixed(2)}</Typography>
                  </Stack>
                </CardContent>
              </Card>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button onClick={handleBack}>Voltar</Button>
                <Button variant="contained" onClick={() => { iniciarPagamento(); handleNext(); }}>
                  Ir para Pagamento
                </Button>
              </Box>
            </Stack>
          )}

          {/* Step 3: Pagamento Mercado Pago (simulado) */}
          {activeStep === 3 && (
            <Stack spacing={2} alignItems="center">
              <Typography variant="h6">Pagamento</Typography>
              {!preferenceId && (
                <CircularProgress sx={{ my: 2 }} />
              )}
              {preferenceId && (
                <Card sx={{ p: 2, bgcolor: '#fafafa', border: '2px solid #e1e1e1', borderRadius: 2, width: '100%', maxWidth: 420 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    [ MERCADO PAGO BRICKS/PRO AQUI ]
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Aqui aparece o formulário de cartão, boleto, Pix, etc (Mercado Pago).<br />
                    Preference ID: <b>{preferenceId}</b>
                  </Typography>
                  <Button
                    onClick={handleNext}
                    variant="contained"
                    sx={{ mt: 2 }}
                    disabled={pagamentoLoading || paymentOk}
                  >
                    {pagamentoLoading ? <CircularProgress size={22} /> : "Confirmar pagamento"}
                  </Button>
                </Card>
              )}
              <Button onClick={handleBack}>Voltar</Button>
            </Stack>
          )}

          {/* Step 4: Confirmação */}
          {activeStep === 4 && (
            <Stack spacing={3} alignItems="center">
              <Alert severity="success" sx={{ width: '100%' }}>
                Compra confirmada! Em breve você receberá o código de rastreio no seu e-mail e WhatsApp.
              </Alert>
              <Button variant="contained" href="/">Voltar para Loja</Button>
            </Stack>
          )}

          {!!alert && <Alert severity="info" sx={{ mt: 3 }}>{alert}</Alert>}
        </CardContent>
      </Card>
    </Box>
  );
}
