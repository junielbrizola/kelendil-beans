'use client'

import { AppBar, Button, Container, Divider, IconButton, Menu, MenuItem, Stack, Toolbar, Typography, useColorScheme } from '@mui/material';
import * as React from 'react'
import { ElevationScroll } from './elevationScroll';
import { DarkModeRounded, GrainRounded, LightModeRounded } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { ModalTracking } from './modalTracking';

interface Props {
  window?: () => Window;
  children?: React.ReactElement<{ elevation?: number, color: string }>;
}

const Navbar = (props: Props) => {
    const router = useRouter()
    const { mode, setMode } = useColorScheme()
    const [openTracking, setOpenTracking] = React.useState(false)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <ModalTracking 
                open={openTracking}
                onClose={() => setOpenTracking(false)}
            />
            <ElevationScroll {...props}>
                <AppBar color="primary">
                    <Container maxWidth="xl">
                        <Toolbar 
                            disableGutters 
                            sx={{
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <Stack
                                onClick={() => router.push('/')}
                                flexDirection="row"
                                alignItems="center"
                            >
                                <GrainRounded />
                                <Typography sx={{ cursor: 'pointer' }} ml={1} variant="h6" component="div" flexGrow={1}>
                                    Kelendil Cacau
                                </Typography>
                            </Stack>
                            <Stack
                                gap={6}
                                flexDirection="row"
                                alignItems="center"
                            >
                                <Button 
                                    variant="text"
                                    onClick={() => {
                                        setOpenTracking(true)
                                    }}
                                >
                                    Rastrear pedido
                                </Button>                  

                                <Divider
                                    sx={{
                                        height: 16
                                    }}
                                    orientation="vertical"
                                />

                                {mode && (
                                    <>
                                        <IconButton
                                            id="basic-button"
                                            aria-controls={open ? 'basic-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            onClick={handleClick}
                                        >
                                            {mode === "light" ? <LightModeRounded /> : <DarkModeRounded />}
                                        </IconButton>
                                        <Menu
                                            id="basic-menu"
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose}
                                            slotProps={{
                                                list: {
                                                'aria-labelledby': 'basic-button',
                                                },
                                            }}
                                        >
                                            <MenuItem onClick={() => { setMode('light'); handleClose() }}><LightModeRounded /></MenuItem>
                                            <MenuItem onClick={() => { setMode('dark'); handleClose() }}><DarkModeRounded /></MenuItem>
                                        </Menu>
                                    </>
                                )} 
                            </Stack>
                        </Toolbar>
                    </Container>
                </AppBar>
            </ElevationScroll>
            <Toolbar />

        </>
    )
}

export { Navbar }