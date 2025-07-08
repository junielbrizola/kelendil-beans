// src/components/ui/Skeleton/ProductSkeleton.tsx
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

export default function ProductSkeleton() {
  return (
    <Card sx={{ borderRadius: 2, boxShadow: 3, height: '100%' }}>
      <Box sx={{ position: 'relative', width: '100%', pt: '56.25%' }}>
        <Skeleton variant="rectangular" width="100%" height="100%" sx={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }} />
      </Box>
      <CardContent>
        <Skeleton variant="text" height={32} width="80%" />
        <Skeleton variant="text" height={24} width="60%" />
        <Skeleton variant="text" height={24} width="40%" />
      </CardContent>
    </Card>
  );
}
