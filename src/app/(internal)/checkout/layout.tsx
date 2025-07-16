'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useColorScheme } from '@mui/material/styles';
import { Navbar } from '@/components/navbar';

interface Props {
  window?: () => Window;
  children?: React.ReactElement<{ elevation?: number, color: string }>;
}

export default function CheckoutLayout(props: Props) {

  const { mode, setMode } = useColorScheme()


  React.useEffect(() => {
    if (mode === 'system') setMode('light')
  }, [])

  return (
    <React.Fragment>
      <Navbar 
        {...props} 
        back
        title='Cacau / Checkout'
      />
      <Container maxWidth="xl">
        <Box sx={{ my: 30 }}>
          {props.children}
        </Box>
      </Container>
    </React.Fragment>
  );
}
