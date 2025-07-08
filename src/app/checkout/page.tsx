export const dynamic = 'force-dynamic';

import React from 'react';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Checkout from '@/components/checkout/Checkout';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function CheckoutPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect(`/login?callbackUrl=/checkout`);
  const userId = session.user.id;
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>
      {/* @ts-expect-error Client Component */}
      <Checkout userId={userId} />
    </Container>
  );
}