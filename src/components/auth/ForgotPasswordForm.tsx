'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import { requestPasswordResetAction } from '@/actions/auth/requestPasswordReset';

const schema = z.object({
  email: z.string().email("Email inválido")
});

type FormData = z.infer<typeof schema>;

export default function ForgotPasswordForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema)
  });
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async data => {
    const fd = new FormData();
    fd.append('email', data.email);
    const res = await requestPasswordResetAction(fd);
    if (res.success) {
      enqueueSnackbar('Email enviado com instruções', { variant: 'success' });
    } else {
      enqueueSnackbar(res?.error?.message, { variant: 'error' });
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: 360, mx: 'auto', mt: 8, p: 4,
        display: 'grid', gap: 2,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 1
      }}
    >
      <Typography variant="h5" align="center">
        Esqueci minha senha
      </Typography>
      <TextField
        label="Email"
        {...register('email')}
        error={!!errors.email}
        helperText={errors.email?.message}
        fullWidth
      />
      <Button
        type="submit"
        variant="contained"
        disabled={isSubmitting}
        fullWidth
      >
        Enviar link
      </Button>
    </Box>
  );
}
