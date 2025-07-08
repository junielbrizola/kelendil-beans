// src/app/signup/page.tsx
'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { signupAction } from '@/actions/auth/signup';

const signupSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(100, 'Nome muito longo'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(8, 'Senha deve ter ao menos 8 caracteres'),
});
type SignupForm = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  });
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (data: SignupForm) => {
    const formData = new FormData();
    Object.entries(data).forEach(([k, v]) => formData.append(k, String(v)));

    const result = await signupAction(formData);
    if (result.success) {
      enqueueSnackbar('Cadastro realizado com sucesso! Por favor, faça login.', { variant: 'success' });
      router.push('/login');
    } else {
      const msg = result.error.fieldErrors
        ? Object.values(result.error.fieldErrors).join(' ')
        : result.error.message;
      enqueueSnackbar(msg, { variant: 'error' });
    }
  };

  return (
    <Container maxWidth="xs" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Cadastro
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ display: 'grid', gap: 2 }}>
        <TextField
          label="Nome"
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message}
          fullWidth
        />
        <TextField
          label="E-mail"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
          fullWidth
        />
        <TextField
          label="Senha"
          type="password"
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
          fullWidth
        />
        <Button type="submit" variant="contained" disabled={isSubmitting}>
          Cadastrar
        </Button>
      </Box>
    </Container>
);
}
