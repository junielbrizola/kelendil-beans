'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useColorScheme } from '@mui/material/styles';
import { Navbar } from '@/components/navbar';
import { Button } from '@mui/material';

interface Props {
  window?: () => Window;
  children?: React.ReactElement<{ elevation?: number, color: string }>;
}

export default function HomeLayout(props: Props) {

  const { mode, setMode } = useColorScheme()

  React.useEffect(() => {
    if (mode === 'system') setMode('light')
  }, [])

  return (
    <React.Fragment>
      <Navbar 
        {...props} 
        title='Cacau'
        action={(
          <Button
            variant="text"
          >
              Rastrear pedido
          </Button>
        )}
      />
      <Container maxWidth="xl">
        <Box sx={{ my: 18 }}>
          {props.children}
        </Box>
      </Container>
    </React.Fragment>
  );
}
