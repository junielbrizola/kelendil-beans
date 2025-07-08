// src/components/admin/products/AdminProductList.tsx
'use client';
import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import type { ActionResult } from '@/actions/types';

type ProductData = {
  id: string;
  name: string;
  type: 'COFFEE' | 'COCOA';
  createdAt: string;
};

interface Props {
  productsResult: ActionResult<{
    products: ProductData[];
    totalCount: number;
    page: number;
    pageSize: number;
  }>;
}

export default function AdminProductList({ productsResult }: Props) {
  const router = useRouter();
  const { success, data, error } = productsResult;

  if (!success) {
    return <Typography color="error">{error.message}</Typography>;
  }

  if (data.products.length === 0) {
    return <Typography>Nenhum produto cadastrado.</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Criado em</TableCell>
            <TableCell align="right">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.products.map((p) => (
            <TableRow key={p.id} hover>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.type}</TableCell>
              <TableCell>{new Date(p.createdAt).toLocaleDateString()}</TableCell>
              <TableCell align="right">
                <Box display="flex" gap={1} justifyContent="flex-end">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => router.push(`/admin/products/${p.id}`)}
                  >
                    Editar
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* aqui você pode adicionar paginação se precisar */}
    </TableContainer>
  );
}
