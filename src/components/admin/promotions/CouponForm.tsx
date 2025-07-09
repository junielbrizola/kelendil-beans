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
import { createCouponAction } from "@/actions/promotions/createCoupon";

const schema = z.object({
  code: z.string().min(1),
  discountType: z.enum(["PERCENTAGE","AMOUNT"]),
  value: z.number().positive(),
  validFrom: z.string(),
  validUntil: z.string(),
  maxUses: z.number().int().positive().optional(),
  active: z.boolean().default(true)
});

type FormData = z.infer<typeof schema>;

export default function CouponForm() {
  const { control, handleSubmit, formState:{ errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues:{
      code:"",
      discountType:"PERCENTAGE",
      value:0,
      validFrom:new Date().toISOString().slice(0,10),
      validUntil:new Date(Date.now()+7*24*60*60*1000).toISOString().slice(0,10),
      maxUses:undefined,
      active:true
    }
  });

  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string|null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data:FormData) => {
    setErrorMsg(null);
    setLoading(true);
    const fd = new FormData();
    Object.entries(data).forEach(([k,v]) => fd.append(k,String(v)));
    const res = await createCouponAction(fd);
    setLoading(false);
    if (res.success) router.push(`/admin/promotions/${res?.data?.couponId}`);
    else setErrorMsg(res?.error?.message as string);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      {errorMsg && <Alert severity="error" sx={{ mb:2 }}>{errorMsg}</Alert>}

      <Controller name="code" control={control} render={({ field }) =>
        <TextField {...field} label="Código" fullWidth margin="normal"
          error={!!errors.code} helperText={errors.code?.message}/>
      }/>

      <Controller name="discountType" control={control} render={({ field }) =>
        <TextField {...field} label="Tipo de Desconto" select fullWidth margin="normal"
          error={!!errors.discountType} helperText={errors.discountType?.message}>
          <MenuItem value="PERCENTAGE">Porcentagem (%)</MenuItem>
          <MenuItem value="AMOUNT">Valor Fixo (R$)</MenuItem>
        </TextField>
      }/>

      <Controller name="value" control={control} render={({ field }) =>
        <TextField {...field} label="Valor" type="number" fullWidth margin="normal"
          error={!!errors.value} helperText={errors.value?.message}/>
      }/>

      <Controller name="validFrom" control={control} render={({ field }) =>
        <TextField {...field} label="Válido de" type="date" fullWidth margin="normal"
          InputLabelProps={{ shrink: true }} error={!!errors.validFrom}
          helperText={errors.validFrom?.message}/>
      }/>

      <Controller name="validUntil" control={control} render={({ field }) =>
        <TextField {...field} label="Válido até" type="date" fullWidth margin="normal"
          InputLabelProps={{ shrink: true }} error={!!errors.validUntil}
          helperText={errors.validUntil?.message}/>
      }/>

      <Controller name="maxUses" control={control} render={({ field }) =>
        <TextField {...field} label="Máx. de usos" type="number" fullWidth margin="normal"
          error={!!errors.maxUses} helperText={errors.maxUses?.message}/>
      }/>

      <Box sx={{ display:'flex', justifyContent:'flex-end', mt:3 }}>
        <Button type="submit" variant="contained" disabled={loading}
          startIcon={loading?<CircularProgress size={20}/>:null}>
          {loading?"Salvando...":"Criar Cupom"}
        </Button>
      </Box>
    </Box>
  );
}
