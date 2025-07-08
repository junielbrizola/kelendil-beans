// src/app/admin/users/page.tsx
export const dynamic = 'auto';

import React, { Suspense } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import AdminUserList from '@/components/admin/UserList';

export default function AdminUsersPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Usuários
      </Typography>
      <Suspense
        fallback={
          <Box>
            <Skeleton variant="text" width="30%" height={32} sx={{ mb: 2 }} />
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} variant="rectangular" height={40} sx={{ mb: 1 }} />
            ))}
          </Box>
        }
      >
        {/* @ts-expect-error Server Component */}
        <AdminUserList />
      </Suspense>
    </Container>
  );
}
