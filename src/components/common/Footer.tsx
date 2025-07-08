// src/components/common/Footer.tsx
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        textAlign: 'center',
        bgcolor: 'background.paper',
        mt: 'auto',
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} Kelendil Grãos. Todos os direitos reservados.
      </Typography>
    </Box>
  );
}
