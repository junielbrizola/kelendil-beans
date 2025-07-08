// src/components/admin/UserList.tsx
'use server';
import React from 'react';
import Link from 'next/link';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { fetchUsersAction } from '@/actions/users/fetchUsers';

export default async function AdminUserList() {
  const formData = new FormData();
  const { success, data, error } = await fetchUsersAction(formData);

  if (!success || !data) {
    return (
      <Typography color="error">
        {error?.message || 'Erro ao carregar usuários.'}
      </Typography>
    );
  }

  if (data.users.length === 0) {
    return <Typography>Nenhum usuário encontrado.</Typography>;
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Nome</TableCell>
          <TableCell>E-mail</TableCell>
          <TableCell>Role</TableCell>
          <TableCell>Ações</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name || '-'}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>
              <Button
                component={Link}
                href={`/admin/users/${user.id}`}
                size="small"
              >
                Ver
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
