'use client';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import {
  fetchUserProfileAction,
  ProfileData
} from '@/actions/users/fetchProfile';
import { updateUserProfileAction } from '@/actions/users/updateProfile';

const profileSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters").optional()
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  userId: string;
}

export default function ProfileForm({ userId }: ProfileFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: '', email: '', password: '' }
  });
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const fd = new FormData();
      fd.append('userId', userId);
      const res = await fetchUserProfileAction(fd);
      setLoading(false);
      if (res.success && res?.data) {
        const d: ProfileData = res?.data;
        reset({ name: d.name || '', email: d.email, password: '' });
      } else {
        enqueueSnackbar(res?.error?.message || 'Error loading profile', {
          variant: 'error'
        });
      }
    })();
  }, [userId, reset, enqueueSnackbar]);

  const onSubmit = async (data: ProfileFormValues) => {
    const fd = new FormData();
    fd.append('userId', userId);
    fd.append('name', data.name);
    fd.append('email', data.email);
    if (data.password) fd.append('password', data.password);
    const res = await updateUserProfileAction(fd);
    if (res.success) {
      enqueueSnackbar('Profile updated', { variant: 'success' });
    } else {
      enqueueSnackbar(res?.error?.message, { variant: 'error' });
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: 400,
        mx: 'auto',
        display: 'grid',
        gap: 2,
        bgcolor: 'background.paper',
        p: 3,
        borderRadius: 2,
        boxShadow: 1
      }}
    >
      <Typography variant="h5" align="center">
        My Profile
      </Typography>
      <TextField
        label="Name"
        {...register('name')}
        error={!!errors.name}
        helperText={errors.name?.message}
        fullWidth
      />
      <TextField
        label="Email"
        {...register('email')}
        error={!!errors.email}
        helperText={errors.email?.message}
        fullWidth
      />
      <TextField
        label="New Password"
        type="password"
        {...register('password')}
        error={!!errors.password}
        helperText={errors.password?.message}
        fullWidth
      />
      <Button variant="contained" type="submit" disabled={isSubmitting}>
        Save Changes
      </Button>
    </Box>
  );
}
