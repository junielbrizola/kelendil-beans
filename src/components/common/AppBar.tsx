// src/components/common/AppBar.tsx
'use client';
import React from 'react';
import Link from 'next/link';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useSession } from 'next-auth/react';
import ThemeToggle from './ThemeToggle';

export default function AppBar() {
  const { data: session } = useSession();
  return (
    <MuiAppBar position="static" elevation={1}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          href="/"
          sx={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}
        >
          Kelendil Grãos
        </Typography>

        <Button component={Link} href="/cart" color="inherit">
          Carrinho
        </Button>

        {session ? (
          <Button
            component={Link}
            href={session.user.role === 'ADMIN' ? '/admin' : '/profile'}
            color="inherit"
          >
            {session.user.name ?? session.user.email}
          </Button>
        ) : (
          <Button component={Link} href="/login" color="inherit">
            Login
          </Button>
        )}

        <Box sx={{ ml: 1 }}>
          <ThemeToggle />
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
}
