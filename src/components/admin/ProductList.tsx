// src/components/admin/ProductList.tsx
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
import { fetchProductsAction } from '@/actions/products';

export default async function AdminProductList() {
  const formData = new FormData();
  const { success, data, error } = await fetchProductsAction(formData);

  if (!success || !data) {
    return (
      <Typography color="error">
        {error?.message || 'Erro ao carregar produtos.'}
      </Typography>
    );
  }

  if (data.products.length === 0) {
    return <Typography>Nenhum produto cadastrado.</Typography>;
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Nome</TableCell>
          <TableCell>Tipo</TableCell>
          <TableCell>Ações</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.products.map((prod) => (
          <TableRow key={prod.id}>
            <TableCell>{prod.name}</TableCell>
            <TableCell>{prod.type === 'COFFEE' ? 'Café' : 'Cacau'}</TableCell>
            <TableCell>
              <Button
                component={Link}
                href={`/admin/products/${prod.id}`}
                size="small"
              >
                Editar
              </Button>
              <Button
                color="error"
                size="small"
                sx={{ ml: 1 }}
                onClick={async () => {
                  const fd = new FormData();
                  fd.append('productId', prod.id);
                  const { deleteProductAction } = await import(
                    '@/actions/products/deleteProduct'
                  );
                  await deleteProductAction(fd);
                  // TODO: revalidar cache/recarregar página
                }}
              >
                Apagar
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
