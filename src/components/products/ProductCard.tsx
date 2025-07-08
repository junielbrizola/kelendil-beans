// src/components/product/ProductCard.tsx
'use client';
import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';

interface ProductCardProps {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
}

export default function ProductCard({ id, name, description, imageUrl }: ProductCardProps) {
  return (
    <Card>
      <CardMedia
        component="img"
        height="180"
        image={imageUrl || '/placeholder.png'}
        alt={name}
      />
      <CardContent>
        <Typography variant="h6" gutterBottom noWrap>
          {name}
        </Typography>
        {description && (
          <Typography variant="body2" color="text.secondary" noWrap>
            {description}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button
          size="small"
          component={Link}
          href={`/product/${id}`}
        >
          Ver Detalhes
        </Button>
      </CardActions>
    </Card>
  );
}
