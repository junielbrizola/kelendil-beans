'use client'

import * as React from 'react';
import { styled, useColorScheme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Container, Stack } from '@mui/material';
import { DashboardRounded, GrainRounded, Inventory2Rounded, MenuRounded, StoreRounded } from '@mui/icons-material';
import { Navbar } from '@/components/navbar';
import { usePathname, useRouter } from 'next/navigation';

const drawerWidth = 340;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  position: 'relative',
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,
      },
    },
  ],
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

interface Props {
  window?: () => Window;
  children?: React.ReactElement<{ elevation?: number, color: string }>;
}

export default function AdminLayout(props: Props) {
  const theme = useTheme();
  const router = useRouter()
  const { mode, setMode } = useColorScheme()

  const [open, setOpen] = React.useState(false);

  const pathname = usePathname()

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (mode === 'system') setMode('light')
  }, [])

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar
        {...props} 
        title='Cacau / Administrador'
        action={(
          <Stack
            gap={3}
            flexDirection="row"
            alignItems="center"
          >
            <IconButton
              onClick={() => router.push('/')}
            >
                <StoreRounded />
            </IconButton>
            <IconButton
              onClick={() => {
                  handleDrawerOpen()
              }}
            >
                <MenuRounded />
            </IconButton>
          </Stack>
        )}
      />
      <Main open={open}>
        <DrawerHeader />
        <Container maxWidth="xl">
          {props.children}
        </Container>  
      </Main>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="temporary"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton selected={pathname === '/administrador'} onClick={() => router.push('/administrador')}>
              <ListItemIcon>
                <DashboardRounded />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton selected={pathname === '/administrador/pedidos'} onClick={() => router.push('/administrador/pedidos')}>
              <ListItemIcon>
                <Inventory2Rounded />
              </ListItemIcon>
              <ListItemText primary="Pedidos" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton selected={pathname === '/administrador/cacaus'} onClick={() => router.push('/administrador/cacaus')}>
              <ListItemIcon>
                <GrainRounded />
              </ListItemIcon>
              <ListItemText primary="Cacaus" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
