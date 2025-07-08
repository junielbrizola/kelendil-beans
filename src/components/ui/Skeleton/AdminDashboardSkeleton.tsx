// src/components/ui/Skeleton/AdminDashboardSkeleton.tsx
import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

export default function AdminDashboardSkeleton() {
  return (
    <Box>
      {/* resumo */}
      <Grid container spacing={2} mb={4}>
        {Array.from({ length: 3 }).map((_, i) => (
          <Grid xs={4} key={i}>
            <Skeleton variant="rectangular" height={100} />
          </Grid>
        ))}
      </Grid>

      {/* gráfico */}
      <Skeleton variant="rectangular" height={300} mb={4} />

      {/* tabela */}
      <Skeleton variant="rectangular" height={400} />
    </Box>
  );
}
