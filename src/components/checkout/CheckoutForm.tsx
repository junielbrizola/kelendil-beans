// src/components/checkout/CheckoutForm.tsx
'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { calculateFreightAction } from '@/actions/shipping/calculateFreight';
import { createOrderAction } from '@/actions/orders/createOrder';
import { createPaymentAction } from '@/actions/payment/createPayment';
import type { ActionResult } from '@/actions/types';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/navigation';

const schema = z.object({
  userId: z.string().uuid(),
  shippingAddress: z.string().min(5),
  shippingPostalCode: z.string().min(5),
  shippingService: z.string().min(1),
  shippingCost: z.number().nonnegative()
});

type FormData = z.infer<typeof schema>;

export default function CheckoutForm() {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { control, handleSubmit, watch, formState:{ errors }} = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      userId: '', // preencha com ID do usuário
      shippingAddress: '',
      shippingPostalCode: '',
      shippingService: '',
      shippingCost: 0
    }
  });

  const [shippingOptions, setShippingOptions] = useState<
    { provider:string; service:string; price:number; estimatedDelivery:string }[]
  >([]);
  const [loadingFreight, setLoadingFreight] = useState(false);
  const [processing, setProcessing] = useState(false);
  const address = watch('shippingAddress');
  const postal = watch('shippingPostalCode');

  const loadFreight = async () => {
    setLoadingFreight(true);
    const fd = new FormData();
    fd.append('destinationPostalCode', postal);
    // exemplo fixo de dimensões/peso, ajuste conforme cart total
    fd.append('weightKg', '1');
    fd.append('lengthCm', '20');
    fd.append('widthCm', '15');
    fd.append('heightCm', '10');
    const res = await calculateFreightAction(fd);
    setLoadingFreight(false);
    if (res.success) setShippingOptions(res?.data?.options || []);
    else enqueueSnackbar(res?.error?.message, { variant:'error' });
  };

  const onSubmit = async (data:FormData) => {
    setProcessing(true);
    // criar pedido
    const fdOrder = new FormData();
    Object.entries(data).forEach(([k,v])=>fdOrder.append(k,String(v)));
    const orderRes = await createOrderAction(fdOrder);
    if (!orderRes.success) {
      enqueueSnackbar(orderRes.error.message, { variant:'error' });
      setProcessing(false);
      return;
    }
    // iniciar pagamento
    const fdPay = new FormData();
    fdPay.append('orderId', orderRes.data.orderId);
    const payRes = await createPaymentAction(fdPay);
    setProcessing(false);
    if (payRes.success) {
      window.location.href = payRes.data.initPoint;
    } else {
      enqueueSnackbar(payRes.error.message, { variant:'error' });
    }
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
      <Controller name="userId" control={control} render={({ field })=><input type="hidden" {...field}/>}/>

      <Controller name="shippingAddress" control={control} render={({ field })=>
        <TextField {...field} label="Endereço" fullWidth margin="normal"
          error={!!errors.shippingAddress} helperText={errors.shippingAddress?.message}/>
      }/>

      <Controller name="shippingPostalCode" control={control} render={({ field })=>
        <TextField {...field} label="CEP" fullWidth margin="normal"
          error={!!errors.shippingPostalCode} helperText={errors.shippingPostalCode?.message}/>
      }/>

      <Box display="flex" gap={2} mb={2}>
        <Button 
          variant="outlined" 
          onClick={loadFreight} 
          disabled={loadingFreight || !postal}
        >
          {loadingFreight ? <CircularProgress size={20}/> : 'Calcular Frete'}
        </Button>
        {shippingOptions.length > 0 && (
          <Controller name="shippingService" control={control} render={({ field })=>
            <TextField {...field} select label="Serviço" size="small" fullWidth
              error={!!errors.shippingService} helperText={errors.shippingService?.message}>
              {shippingOptions.map(o=>(
                <MenuItem key={o.service} value={o.service}>
                  {o.provider} - {o.service} — R$ {o.price.toFixed(2)} ({o.estimatedDelivery})
                </MenuItem>
              ))}
            </TextField>
          }/>
        )}
      </Box>

      {/* ao selecionar serviço, atualiza custo */}
      <Controller name="shippingCost" control={control} render={({ field })=> {
        const selected = shippingOptions.find(o=>o.service === field.value);
        return (
          <input type="hidden" value={selected?.price ?? ''} {...field}/>
        );
      }}/>

      <Box textAlign="right" mt={4}>
        <Button 
          type="submit" 
          variant="contained" 
          disabled={processing || shippingOptions.length===0}
          startIcon={processing ? <CircularProgress size={20}/> : null}
        >
          {processing ? 'Processando...' : 'Pagar com MercadoPago'}
        </Button>
      </Box>
    </Box>
  );
}
