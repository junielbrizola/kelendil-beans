// src/components/checkout/ShippingOptionCard.tsx
import React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';

export interface FreightOption {
  provider: string;
  service: string;
  price: number;
  estimatedDelivery: string;
}

interface ShippingOptionCardProps {
  option: FreightOption;
  selected: boolean;
  onSelect: () => void;
}

export default function ShippingOptionCard({
  option,
  selected,
  onSelect
}: ShippingOptionCardProps) {
  return (
    <Card
      variant={selected ? 'elevation' : 'outlined'}
      sx={{
        borderRadius: 2,
        mb: 2,
        ...(selected && { boxShadow: 4 }),
      }}
    >
      <CardActionArea onClick={onSelect}>
        <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
          <FormControlLabel
            control={
              <Radio
                checked={selected}
                onChange={onSelect}
                value={option.service}
              />
            }
            label=""
            sx={{ mr: 2 }}
          />
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">
              {option.provider} – {option.service}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Entrega em até {option.estimatedDelivery}
            </Typography>
          </Box>
          <Typography variant="subtitle1" color="primary">
            R$ {option.price.toFixed(2)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
