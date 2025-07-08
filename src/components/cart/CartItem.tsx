// src/components/cart/CartItem.tsx
import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Image from 'next/image';
import DeleteIcon from '@mui/icons-material/Delete';

export interface CartItemProps {
  id: string;
  name: string;
  variantDescription?: string;
  imageUrl?: string;
  quantity: number;
  unitPrice: number;
  onQuantityChange: (newQuantity: number) => void;
  onRemove: () => void;
}

export function CartItem({
  name,
  variantDescription,
  imageUrl,
  quantity,
  unitPrice,
  onQuantityChange,
  onRemove
}: CartItemProps) {
  const subtotal = (unitPrice * quantity).toFixed(2);

  return (
    <Paper
      elevation={1}
      sx={{ display: 'flex', alignItems: 'center', p: 2, mb: 2, borderRadius: 2 }}
    >
      <Box sx={{ position: 'relative', width: 80, height: 80, mr: 2 }}>
        <Image
          src={imageUrl ?? '/placeholder.png'}
          alt={name}
          fill
          style={{ objectFit: 'cover', borderRadius: 8 }}
          priority={false}
        />
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" noWrap>
          {name}
        </Typography>
        {variantDescription && (
          <Typography variant="body2" color="text.secondary" noWrap>
            {variantDescription}
          </Typography>
        )}
        <Typography variant="body2" sx={{ mt: 1 }}>
          R$ {unitPrice.toFixed(2)} cada
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
        <ButtonGroup size="small" variant="outlined">
          <Button
            onClick={() => onQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
          >
            –
          </Button>
          <Button disabled>{quantity}</Button>
          <Button onClick={() => onQuantityChange(quantity + 1)}>+</Button>
        </ButtonGroup>
      </Box>
      <Box sx={{ textAlign: 'right', ml: 2 }}>
        <Typography variant="subtitle1">R$ {subtotal}</Typography>
      </Box>
      <IconButton onClick={onRemove} sx={{ ml: 1 }}>
        <DeleteIcon />
      </IconButton>
    </Paper>
  );
}
