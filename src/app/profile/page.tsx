export const dynamic = 'auto';

import React, { Suspense } from 'react';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ProfileForm from '@/components/profile/ProfileForm';
import ProfileSkeleton from '@/components/ui/Skeleton/ProfileSkeleton';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(`/login?callbackUrl=/profile`);
  }
  const userId = session.user.id;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Profile
      </Typography>
      <Suspense fallback={<ProfileSkeleton />}>
        {/* @ts-expect-error Server Component */}
        <ProfileForm userId={userId} />
      </Suspense>
    </Container>
  );
}
