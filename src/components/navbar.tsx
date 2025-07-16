/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { AppBar, Container, Divider, IconButton, Menu, MenuItem, Stack, Toolbar, Typography, useColorScheme } from '@mui/material';
import * as React from 'react'
import { ElevationScroll } from './elevationScroll';
import { DarkModeRounded, GrainRounded, KeyboardArrowLeft, LightModeRounded } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

interface Props {
  window?: () => Window;
  children?: React.ReactElement<{ elevation?: number, color: string }>;
  title: string
  action?: any
  back?: boolean
}

const Navbar = (props: Props) => {
    const router = useRouter()
    const { mode, setMode } = useColorScheme()
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
                                gap={3}
                                flexDirection="row"
                                alignItems="center"
                            >
                                {props.back && (
                                    <IconButton onClick={() => router.push("/")}>
                                        <KeyboardArrowLeft />
                                    </IconButton>
                                )}
                                <Stack
                                    flexDirection="row"
                                    alignItems="center"
                                >
                                    <GrainRounded />
                                    <Typography sx={{ cursor: 'pointer' }} ml={1} variant="h6" component="div" flexGrow={1}>
                                        {props.title}
                                    </Typography>
                                </Stack>
                            </Stack>
                            <Stack
                                gap={6}
                                flexDirection="row"
                                alignItems="center"
                            >
                                {props?.action}                  

                                {props?.action && (
                                    <Divider
                                        sx={{
                                            height: 16
                                        }}
                                        orientation="vertical"
                                    />
                                )}

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