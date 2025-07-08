// src/app/admin/users/[id]/page.tsx
export const dynamic = 'auto';

import React, { Suspense } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

import { fetchUserDetailsAction } from '@/actions/users/fetchUserDetails';
import UserDetail from '@/components/admin/UserDetail';

interface AdminUserDetailPageProps {
  params: { id: string };
}

async function ServerUserDetail({ id }: { id: string }) {
  const formData = new FormData();
  formData.append('userId', id);
  const { success, data, error } = await fetchUserDetailsAction(formData);

  if (!success || !data) {
    return (
      <Typography color="error" sx={{ mt: 2 }}>
        {error?.message || 'Erro ao carregar detalhes do usuário.'}
      </Typography>
    );
  }

  return <UserDetail user={data} />;
}

export default function AdminUserDetailPage({ params: { id } }: AdminUserDetailPageProps) {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Detalhes do Usuário
      </Typography>
      <Suspense
        fallback={
          <Box>
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} variant="text" height={24} sx={{ mb: 1 }} />
            ))}
          </Box>
        }
      >
        {/* @ts-expect-error Server Component */}
        <ServerUserDetail id={id} />
      </Suspense>
    </Container>
  );
}
