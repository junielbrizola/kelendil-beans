// src/components/checkout/ShippingForm.tsx
'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import ShippingOptionCard, { FreightOption } from './ShippingOptionCard';
import { calculateFreightAction } from '@/actions/shipping/calculateFreight';

const shippingSchema = z.object({
  destinationPostalCode: z.string().min(5, 'CEP inválido'),
  weightKg: z.number().positive(),
  lengthCm: z.number().positive(),
  widthCm: z.number().positive(),
  heightCm: z.number().positive(),
});

type ShippingFormValues = z.infer<typeof shippingSchema>;

export default function ShippingForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      destinationPostalCode: '',
      weightKg: 0.5,
      lengthCm: 10,
      widthCm: 10,
      heightCm: 10,
    },
  });

  const [options, setOptions] = useState<FreightOption[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const onSubmit = async (data: ShippingFormValues) => {
    setApiError(null);
    setOptions([]);
    setSelectedIndex(null);

    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, val]) => formData.append(key, String(val)));

      const result = await calculateFreightAction(formData);
      if (result.success) {
        setOptions(result.data.options);
      } else {
        setApiError(result.error.message);
      }
    } catch (e) {
      setApiError('Erro ao calcular frete');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <TextField
        label="CEP de destino"
        {...register('destinationPostalCode')}
        error={!!errors.destinationPostalCode}
        helperText={errors.destinationPostalCode?.message}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Peso (kg)"
        type="number"
        inputProps={{ step: 0.01 }}
        {...register('weightKg', { valueAsNumber: true })}
        error={!!errors.weightKg}
        helperText={errors.weightKg?.message}
        fullWidth
        margin="normal"
      />
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          label="Comprimento (cm)"
          type="number"
          inputProps={{ step: 1 }}
          {...register('lengthCm', { valueAsNumber: true })}
          error={!!errors.lengthCm}
          helperText={errors.lengthCm?.message}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Largura (cm)"
          type="number"
          inputProps={{ step: 1 }}
          {...register('widthCm', { valueAsNumber: true })}
          error={!!errors.widthCm}
          helperText={errors.widthCm?.message}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Altura (cm)"
          type="number"
          inputProps={{ step: 1 }}
          {...register('heightCm', { valueAsNumber: true })}
          error={!!errors.heightCm}
          helperText={errors.heightCm?.message}
          fullWidth
          margin="normal"
        />
      </Box>

      {apiError && (
        <Typography color="error" sx={{ mt: 1 }}>
          {apiError}
        </Typography>
      )}

      <Button
        type="submit"
        variant="contained"
        disabled={isSubmitting}
        sx={{ mt: 2 }}
      >
        Calcular Frete
      </Button>

      {options.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Opções de Frete
          </Typography>
          {options.map((opt, idx) => (
            <ShippingOptionCard
              key={idx}
              option={opt}
              selected={selectedIndex === idx}
              onSelect={() => setSelectedIndex(idx)}
            />
          ))}
        </Box>
      )}
    </Box>
  )
}
