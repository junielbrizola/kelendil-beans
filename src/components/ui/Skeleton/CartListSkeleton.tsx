// src/components/ui/Skeleton/CartListSkeleton.tsx
import React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function CartListSkeleton() {
  return (
    <>
      <TableContainer component={Paper} sx={{ mb:3 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {['Produto','Preço','Qtd.','Subtotal','Ações'].map(h=>(
                <TableCell key={h}><Skeleton variant="text" width={60} /></TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from({ length:4 }).map((_,i)=>(
              <TableRow key={i}>
                {Array.from({ length:5 }).map((__,j)=>(
                  <TableCell key={j}><Skeleton variant="text" /></TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="flex-end" mb={4}>
        <Skeleton variant="text" width={120} height={32} />
      </Box>
      <Box textAlign="right">
        <Skeleton variant="rectangular" width={200} height={48} />
      </Box>
    </>
  );
}
