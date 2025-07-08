// src/components/ui/Skeleton/OrderListSkeleton.tsx
import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Skeleton from '@mui/material/Skeleton';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

export default function OrderListSkeleton() {
  return (
    <Box>
      <List>
        {Array.from({ length: 5 }).map((_, i) => (
          <React.Fragment key={i}>
            <ListItem>
              <Skeleton variant="text" width="40%" height={30} />
            </ListItem>
            <Divider component="li" />
          </React.Fragment>
        ))}
      </List>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Skeleton variant="rectangular" width={200} height={40} />
      </Box>
    </Box>
  );
}
