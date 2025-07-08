'use server';
import React from 'react';
import Link from 'next/link';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import { fetchAdminProductsAction, AdminProductSummary } from '@/actions/admin/fetchProducts';

interface ProductTableProps {
  searchParams: {
    search?: string;
    page?: string;
    pageSize?: string;
  };
}

export default async function ProductTable({ searchParams }: ProductTableProps) {
  const formData = new FormData();
  if (searchParams.search) formData.append('search', searchParams.search);
  formData.append('page', searchParams.page || '1');
  formData.append('pageSize', searchParams.pageSize || '10');
  const { success, data, error } = await fetchAdminProductsAction(formData);

  if (!success || !data) {
    return (
      <Typography color="error" sx={{ textAlign: 'center', mt: 4 }}>
        {error?.message || 'Erro ao carregar produtos.'}
      </Typography>
    );
  }
  const { products, totalCount, page, pageSize } = data;

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Variante(s)</TableCell>
            <TableCell>Criado em</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((prod: AdminProductSummary) => (
            <TableRow key={prod.id}>
              <TableCell>{prod.name}</TableCell>
              <TableCell>{prod.type}</TableCell>
              <TableCell>{prod.variantsCount}</TableCell>
              <TableCell>{new Date(prod.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>
                <Link href={`/admin/products/${prod.id}/edit`}>Editar</Link>
                {' | '}
                <Link href={`/admin/products/${prod.id}/delete`}>Excluir</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={totalCount}
        page={page - 1}
        onPageChange={() => {}}
        rowsPerPage={pageSize}
        rowsPerPageOptions={[pageSize]}
      />
    </>
  );
}
