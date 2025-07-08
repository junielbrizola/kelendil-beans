export const dynamic = 'force-dynamic';
import React from 'react';
import Container from '@mui/material/Container';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';

export default function ForgotPasswordPage() {
  return (
    <Container maxWidth="sm">
      <ForgotPasswordForm />
    </Container>
  );
}
