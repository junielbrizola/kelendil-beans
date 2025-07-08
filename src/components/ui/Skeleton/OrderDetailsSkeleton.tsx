// src/components/ui/Skeleton/OrderDetailsSkeleton.tsx
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
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

export default function OrderDetailsSkeleton() {
  return (
    <Box>
      <Skeleton variant="text" width="50%" height={40} />
      <Skeleton variant="text" width="30%" height={24} sx={{ mb: 2 }} />

      <Skeleton variant="text" width="30%" height={32} />
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {['Produto', 'Qtd', 'Unit.', 'Subtotal'].map((h) => (
                <TableCell key={h}>
                  <Skeleton variant="text" width={60} />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from({ length: 3 }).map((_, i) => (
              <TableRow key={i}>
                {Array.from({ length: 4 }).map((__, j) => (
                  <TableCell key={j}>
                    <Skeleton variant="text" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Skeleton variant="text" width="30%" height={32} />
      <Skeleton variant="text" width="30%" height={32} sx={{ mt: 2, mb: 2 }} />

      <Skeleton variant="text" width="30%" height={32} />
      <List>
        {Array.from({ length: 2 }).map((_, i) => (
          <ListItem key={i}>
            <Skeleton variant="text" width="80%" />
          </ListItem>
        ))}
      </List>

      <Skeleton variant="text" width="30%" height={32} sx={{ mt: 2, mb: 2 }} />
      <List>
        {Array.from({ length: 3 }).map((_, i) => (
          <ListItem key={i}>
            <Skeleton variant="text" width="80%" />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
