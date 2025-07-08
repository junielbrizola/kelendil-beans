export const dynamic = 'force-dynamic';

import React from 'react';
import Container from '@mui/material/Container';
import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <Container maxWidth="sm">
      <LoginForm />
    </Container>
  );
}
