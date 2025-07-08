// src/components/admin/UserDetail.tsx
'use client';
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export interface UserDetailData {
  id: string;
  name?: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface UserDetailProps {
  user: UserDetailData;
}

export default function UserDetail({ user }: UserDetailProps) {
  return (
    <Box sx={{ display: 'grid', gap: 2 }}>
      <Typography variant="subtitle1"><strong>ID:</strong> {user.id}</Typography>
      <Typography variant="subtitle1"><strong>Nome:</strong> {user.name || '-'}</Typography>
      <Typography variant="subtitle1"><strong>E-mail:</strong> {user.email}</Typography>
      <Typography variant="subtitle1"><strong>Role:</strong> {user.role}</Typography>
      <Typography variant="subtitle1"><strong>Criado em:</strong> {new Date(user.createdAt).toLocaleString()}</Typography>
      <Typography variant="subtitle1"><strong>Atualizado em:</strong> {new Date(user.updatedAt).toLocaleString()}</Typography>
    </Box>
  );
}
