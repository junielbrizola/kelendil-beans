'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { createUserAction } from "@/actions/users/createUser";

const schema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["USER","ADMIN"])
});

type FormData = z.infer<typeof schema>;

export default function UserForm() {
  const { control, handleSubmit, formState:{ errors }} = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues:{ name:"", email:"", password:"", role:"USER" }
  });

  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string|null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data:FormData) => {
    setErrorMsg(null);
    setLoading(true);
    const fd = new FormData();
    Object.entries(data).forEach(([k,v])=>fd.append(k,v));
    const res = await createUserAction(fd);
    setLoading(false);
    if (res.success) router.push(`/admin/users/${res?.data?.userId}`);
    else setErrorMsg(res?.error?.message as string);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      {errorMsg && <Alert severity="error" sx={{ mb:2 }}>{errorMsg}</Alert>}

      <Controller name="name" control={control} render={({ field })=>
        <TextField {...field} label="Nome" fullWidth margin="normal"
          error={!!errors.name} helperText={errors.name?.message}/>
      }/>
      <Controller name="email" control={control} render={({ field })=>
        <TextField {...field} label="Email" fullWidth margin="normal"
          error={!!errors.email} helperText={errors.email?.message}/>
      }/>
      <Controller name="password" control={control} render={({ field })=>
        <TextField {...field} label="Senha" type="password" fullWidth margin="normal"
          error={!!errors.password} helperText={errors.password?.message}/>
      }/>
      <Controller name="role" control={control} render={({ field })=>
        <TextField {...field} label="Papel" select fullWidth margin="normal"
          error={!!errors.role} helperText={errors.role?.message}>
          <MenuItem value="USER">Usuário</MenuItem>
          <MenuItem value="ADMIN">Admin</MenuItem>
        </TextField>
      }/>

      <Box sx={{ display:'flex', justifyContent:'flex-end', mt:3 }}>
        <Button type="submit" variant="contained" disabled={loading}
          startIcon={loading?<CircularProgress size={20}/>:null}>
          {loading?"Salvando...":"Criar Usuário"}
        </Button>
      </Box>
    </Box>
  );
}
