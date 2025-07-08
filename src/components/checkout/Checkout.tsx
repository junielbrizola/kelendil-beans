'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Divider from '@mui/material/Divider';
import { calculateFreightAction } from '@/actions/shipping/calculateFreight';
import { createOrderAction } from '@/actions/orders/createOrder';
import { createPaymentAction } from '@/actions/payment/createPayment';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/navigation';

const addressSchema = z.object({
  shippingAddress: z.string().min(5, 'Endereço muito curto'),
  shippingPostalCode: z.string().min(5, 'CEP inválido'),
});

type AddressFormValues = z.infer<typeof addressSchema>;

type FreightOption = {
  provider: string;
  service: string;
  price: number;
  estimatedDelivery: string;
};

interface CheckoutProps {
  userId: string;
}

export default function Checkout({ userId }: CheckoutProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: { shippingAddress: '', shippingPostalCode: '' },
  });

  const [freightOptions, setFreightOptions] = useState<FreightOption[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [address, setAddress] = useState<AddressFormValues | null>(null);
  const [loadingCalc, setLoadingCalc] = useState(false);
  const [loadingPay, setLoadingPay] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const onCalculate = async (data: AddressFormValues) => {
    setLoadingCalc(true);
    setAddress(data);
    try {
      const fd = new FormData();
      fd.append('destinationPostalCode', data.shippingPostalCode);
      fd.append('weightKg', '1');
      fd.append('lengthCm', '10');
      fd.append('widthCm', '10');
      fd.append('heightCm', '10');
      const res = await calculateFreightAction(fd);
      if (!res.success) {
        enqueueSnackbar(res.error.message, { variant: 'error' });
      } else {
        setFreightOptions(res.data.options);
      }
    } catch {
      enqueueSnackbar('Erro ao calcular frete', { variant: 'error' });
    }
    setLoadingCalc(false);
  };

  const onPay = async () => {
    if (selectedIdx === null || address === null) {
      enqueueSnackbar('Selecione uma opção de frete', { variant: 'warning' });
      return;
    }
    setLoadingPay(true);
    try {
      // 1) cria o pedido
      const orderFd = new FormData();
      orderFd.append('userId', userId);
      orderFd.append('shippingAddress', address.shippingAddress);
      orderFd.append('shippingPostalCode', address.shippingPostalCode);
      const opt = freightOptions[selectedIdx];
      orderFd.append('shippingService', opt.service);
      orderFd.append('shippingCost', String(opt.price));
      const orderRes = await createOrderAction(orderFd);
      if (!orderRes.success) {
        enqueueSnackbar(orderRes.error.message, { variant: 'error' });
        setLoadingPay(false);
        return;
      }
      // 2) gera preferência de pagamento
      const paymentFd = new FormData();
      paymentFd.append('orderId', orderRes.data.orderId);
      const payRes = await createPaymentAction(paymentFd);
      if (!payRes.success) {
        enqueueSnackbar(payRes.error.message, { variant: 'error' });
        setLoadingPay(false);
        return;
      }
      window.location.href = payRes.data.initPoint;
    } catch {
      enqueueSnackbar('Erro no checkout', { variant: 'error' });
      setLoadingPay(false);
    }
  };

  return (
    <Box sx={{ display: 'grid', gap: 3 }}>
      {/* 1) Formulário de endereço */}
      <Box component="form" onSubmit={handleSubmit(onCalculate)} sx={{ display: 'grid', gap: 2 }}>
        <Typography variant="h6">Endereço de entrega</Typography>
        <TextField
          label="Endereço completo"
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
        <Button type="submit" variant="outlined" disabled={loadingCalc}>
          {loadingCalc ? 'Calculando...' : 'Calcular Frete'}
        </Button>
      </Box>

      {/* 2) Opções de frete */}
      {freightOptions.length > 0 && (
        <Box sx={{ display: 'grid', gap: 1 }}>
          <Typography variant="h6">Opções de frete</Typography>
          <RadioGroup
            value={selectedIdx !== null ? String(selectedIdx) : ''}
            onChange={e => setSelectedIdx(Number(e.target.value))}
          >
            {freightOptions.map((opt, idx) => (
              <FormControlLabel
                key={idx}
                value={String(idx)}
                control={<Radio />}
                label={`${opt.provider} ${opt.service} — R$ ${opt.price.toFixed(2)} (Entrega em ${opt.estimatedDelivery} dias)`}
              />
            ))}
          </RadioGroup>
        </Box>
      )}

      <Divider />

      {/* 3) Botão de pagamento */}
      <Box sx={{ textAlign: 'right' }}>
        <Button
          variant="contained"
          onClick={onPay}
          disabled={loadingPay || selectedIdx === null}
        >
          {loadingPay ? 'Processando...' : 'Finalizar Pagamento'}
        </Button>
      </Box>
    </Box>
);
}