'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/navigation';
import { calculateFreightAction } from '@/actions/shipping/calculateFreight';
import { createOrderAction } from '@/actions/orders/createOrder';
import { createPaymentAction } from '@/actions/payment/createPayment';

const shippingSchema = z.object({
  shippingAddress: z.string().min(5, 'Endereço deve ter ao menos 5 caracteres'),
  shippingPostalCode: z.string().min(5, 'CEP inválido'),
});
type ShippingForm = z.infer<typeof shippingSchema>;

export default function CheckoutForm({
  userId,
  totalWeightKg,
}: {
  userId: string;
  totalWeightKg: number;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<ShippingForm>({ resolver: zodResolver(shippingSchema) });

  const [options, setOptions] = useState<
    { provider: string; service: string; price: number; estimatedDelivery: string }[]
  >([]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [step, setStep] = useState<'address' | 'review'>('address');
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const onCalcFreight = async (data: ShippingForm) => {
    const fd = new FormData();
    fd.append('destinationPostalCode', data.shippingPostalCode);
    fd.append('weightKg', String(totalWeightKg));
    fd.append('lengthCm', '10');
    fd.append('widthCm', '10');
    fd.append('heightCm', '10');

    const result = await calculateFreightAction(fd);
    if (!result.success) {
      enqueueSnackbar(result.error.message, { variant: 'error' });
      return;
    }
    setOptions(result.data.options);
    setStep('review');
  };

  const onConfirm = async () => {
    if (selectedIdx === null) {
      enqueueSnackbar('Selecione uma opção de frete', { variant: 'warning' });
      return;
    }

    const address = watch('shippingAddress');
    const postal = watch('shippingPostalCode');
    const opt = options[selectedIdx];

    const orderFd = new FormData();
    orderFd.append('userId', userId);
    orderFd.append('shippingAddress', address);
    orderFd.append('shippingPostalCode', postal);
    orderFd.append('shippingService', opt.service);
    orderFd.append('shippingCost', String(opt.price));

    const orderRes = await createOrderAction(orderFd);
    if (!orderRes.success) {
      enqueueSnackbar(orderRes.error.message, { variant: 'error' });
      return;
    }

    const payFd = new FormData();
    payFd.append('orderId', orderRes.data.orderId);
    const payRes = await createPaymentAction(payFd);
    if (!payRes.success) {
      enqueueSnackbar(payRes.error.message, { variant: 'error' });
      return;
    }

    window.location.href = payRes.data.initPoint;
  };

  if (step === 'address') {
    return (
      <Box component="form" onSubmit={handleSubmit(onCalcFreight)} noValidate sx={{ display: 'grid', gap: 2 }}>
        <TextField
          label="Endereço de Entrega"
          {...register('shippingAddress')}
          error={!!errors.shippingAddress}
          helperText={errors.shippingAddress?.message}
          fullWidth
        />
        <TextField
          label="CEP"
          {...register('shippingPostalCode')}
          error={!!errors.shippingPostalCode}
          helperText={errors.shippingPostalCode?.message}
          fullWidth
        />
        <Button type="submit" variant="contained" disabled={isSubmitting}>
          Calcular Frete
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'grid', gap: 2 }}>
      <Typography variant="subtitle1">Opções de Frete</Typography>
      <RadioGroup
        value={selectedIdx !== null ? String(selectedIdx) : ''}
        onChange={e => setSelectedIdx(Number(e.target.value))}
      >
        {options.map((opt, i) => (
          <FormControlLabel
            key={i}
            value={String(i)}
            control={<Radio />}
            label={`${opt.provider} – ${opt.service}: R$ ${opt.price.toFixed(2)} (${opt.estimatedDelivery} dias)`}
          />
        ))}
      </RadioGroup>
      <Button variant="contained" onClick={onConfirm}>
        Confirmar e Pagar
      </Button>
      <Button variant="text" onClick={() => setStep('address')}>
        Voltar
      </Button>
    </Box>
  );
}
