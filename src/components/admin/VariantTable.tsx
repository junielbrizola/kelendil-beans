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
import { fetchVariantsAction } from '@/actions/products/variants/fetchVariants';

interface VariantTableProps {
  productId: string;
  searchParams: {
    page?: string;
    pageSize?: string;
  };
}

export default async function VariantTable({ productId, searchParams }: VariantTableProps) {
  const fd = new FormData();
  fd.append('productId', productId);
  fd.append('page', searchParams.page || '1');
  fd.append('pageSize', searchParams.pageSize || '10');

  const { success, data, error } = await fetchVariantsAction(fd);

  if (!success || !data) {
    return (
      <Typography color="error" sx={{ textAlign: 'center', mt: 4 }}>
        {error?.message || 'Erro ao carregar variantes.'}
      </Typography>
    );
  }

  const { variants, totalCount, page, pageSize } = data;

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Peso (g)</TableCell>
            <TableCell>Preço (R$)</TableCell>
            <TableCell>Estoque</TableCell>
            <TableCell>Criado em</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {variants.map(v => (
            <TableRow key={v.id}>
              <TableCell>{v.weightInGrams}</TableCell>
              <TableCell>{v.price.toFixed(2)}</TableCell>
              <TableCell>{v.stock}</TableCell>
              <TableCell>{new Date(v.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>
                <Link href={`/admin/products/${productId}/variants/${v.id}/edit`}>Editar</Link>
                {' | '}
                <Link href={`/admin/products/${productId}/variants/${v.id}/delete`}>Excluir</Link>
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
