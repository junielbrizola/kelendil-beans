export const dynamic = 'force-dynamic';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import Container from '@mui/material/Container';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';

export default function ResetPasswordPage() {
  const params = useSearchParams();
  const token = params.get('token') || '';
  return (
    <Container maxWidth="sm">
      <ResetPasswordForm token={token} />
    </Container>
  );
}
