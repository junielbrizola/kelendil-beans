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
import { resetPasswordAction } from '@/actions/auth/resetPassword';

const schema = z.object({
  password: z.string().min(8, "Senha deve ter ao menos 8 caracteres"),
  confirm: z.string().min(8)
}).refine(data => data.password === data.confirm, {
  path: ['confirm'],
  message: 'Senhas não conferem'
});

type FormData = z.infer<typeof schema>;

export default function ResetPasswordForm({ token }: { token: string }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema)
  });
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async data => {
    const fd = new FormData();
    fd.append('token', token);
    fd.append('password', data.password);
    const res = await resetPasswordAction(fd);
    if (res.success) {
      enqueueSnackbar('Senha atualizada!', { variant: 'success' });
      window.location.href = '/login';
    } else {
      enqueueSnackbar(res.error.message, { variant: 'error' });
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
        Nova Senha
      </Typography>
      <TextField
        label="Senha"
        type="password"
        {...register('password')}
        error={!!errors.password}
        helperText={errors.password?.message}
        fullWidth
      />
      <TextField
        label="Confirmar Senha"
        type="password"
        {...register('confirm')}
        error={!!errors.confirm}
        helperText={errors.confirm?.message}
        fullWidth
      />
      <Button
        type="submit"
        variant="contained"
        disabled={isSubmitting}
        fullWidth
      >
        Redefinir
      </Button>
    </Box>
);
}