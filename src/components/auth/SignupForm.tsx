'use client';

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Box,
  TextField,
  Button,
  Typography,
  Link as MuiLink
} from "@mui/material";
import { signupAction } from "@/actions/auth/signup";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";

const formSchema = z
  .object({
    name: z.string().min(1, "Nome obrigatório"),
    email: z.string().email("E-mail inválido"),
    password: z.string().min(8, "Mínimo 8 caracteres"),
    confirmPassword: z.string().min(1, "Confirme a senha")
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"]
  });

type FormValues = z.infer<typeof formSchema>;

export default function SignupForm() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);

    const res = await signupAction(formData);
    if (res.success) {
      enqueueSnackbar("Cadastro realizado com sucesso!", { variant: "success" });
      router.push("/login");
    } else {
      enqueueSnackbar(res?.error?.message, { variant: "error" });
      // Optionally set field errors programmatically...
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{
        maxWidth: 400,
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 2
      }}
    >
      <Typography variant="h5" textAlign="center" gutterBottom>
        Crie sua conta
      </Typography>

      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Nome completo"
            fullWidth
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="E-mail"
            type="email"
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Senha"
            type="password"
            fullWidth
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        )}
      />

      <Controller
        name="confirmPassword"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Confirme a senha"
            type="password"
            fullWidth
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
        )}
      />

      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={isSubmitting}
        sx={{ mt: 1 }}
      >
        {isSubmitting ? "Cadastrando..." : "Cadastrar"}
      </Button>

      <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
        Já tem conta?{" "}
        <MuiLink href="/login" underline="hover">
          Entrar
        </MuiLink>
      </Typography>
    </Box>
  );
}
