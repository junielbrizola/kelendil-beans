// src/components/products/RelatedProducts.tsx
'use client';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Skeleton from '@mui/material/Skeleton';
import { useRouter } from 'next/navigation';
import { fetchRelatedProductsAction, RelatedProduct } from '@/actions/products/fetchRelatedProducts';

interface RelatedProductsProps {
  productId: string;
  type: "COFFEE" | "COCOA";
}

export default function RelatedProducts({ productId, type }: RelatedProductsProps) {
  const [related, setRelated] = useState<RelatedProduct[] | null>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const fd = new FormData();
      fd.append('productId', productId);
      fd.append('type', type);
      const res = await fetchRelatedProductsAction(fd);
      if (res.success) setRelated(res?.data);
    })();
  }, [productId, type]);

  if (!related) {
    return (
      <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', py: 2 }}>
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} variant="rectangular" width={160} height={200} />
        ))}
      </Box>
    );
  }
  if (related.length === 0) return null;

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Você também pode gostar
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', py: 1 }}>
        {related.map(p => (
          <Card key={p.id} sx={{ minWidth: 160 }}>
            <CardActionArea onClick={() => router.push(`/products/${p.id}`)}>
              {p.imageUrl ? (
                <CardMedia
                  component="img"
                  height="120"
                  image={p.imageUrl}
                  alt={p.name}
                />
              ) : (
                <Skeleton variant="rectangular" height={120} />
              )}
              <CardContent>
                <Typography noWrap variant="subtitle2">
                  {p.name}
                </Typography>
                {p.variants[0] && (
                  <Typography variant="body2" color="text.secondary">
                    R$ {p.variants[0].price.toFixed(2)}
                  </Typography>
                )}
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
