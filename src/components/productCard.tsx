'use client'
import { ShoppingCartCheckoutRounded } from '@mui/icons-material'
import {
    Button,
    List,
    ListItem,
    ListItemText,
    MenuItem,
    Stack,
    TextField,
    Typography,
    Tabs,
    Tab,
    Box,
} from '@mui/material'
import * as React from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
    formatCurrency,
    parseCurrency
} from '@brazilian-utils/brazilian-utils'

interface IProductCard {
    inverted?: boolean
    levels: {
        aroma: string
        flavor: string
        color: string
        texture: string
        summary: string
        price: number
        image: string
    }[]
    title: string
}

type FormValues = {
    level: number  
    type: '1' | '2'
    weight: '500' | '1000'
    quantity: number
}

const levelLabels = ['Leve', 'Médio', 'Médio Escuro', 'Escuro']

const ProductCard: React.FC<IProductCard> = ({
  inverted = false,
  levels,
  title
}) => {
    const { watch, setValue, control, handleSubmit } = useForm<FormValues>({
        defaultValues: {
            level: 0,
            type: '1',
            weight: '500',
            quantity: 1
        }
    })

    const onSubmit = React.useCallback(async (data: FormValues) => {
        try {
            console.log('Carrinho:', {
                title,
                roast: levels[data?.level],
                ...data
            })
        } catch (e) {
            console.log({ e })
        }
    }, [levels, title])

    return (
        <Stack
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            gap={30}
            sx={{
                flexDirection: inverted ? 'row' : 'row-reverse',
                alignItems: 'center',
            }}
        >
            <Stack
                sx={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: { xs: '300px', md: '600px' },
                    width: { xs: '300px', md: '600px' },
                    position: 'relative',
                    flexShrink: 0
                }}
            >
                {/* Glow suave de fundo para efeito "luz" */}
                <Box
                    sx={{
                        position: 'absolute',
                        width: '75%',
                        height: '35%',
                        left: '50%',
                        bottom: 10,
                        transform: 'translateX(-50%)',
                        background: 'radial-gradient(ellipse at center, #ffecb3 0%, rgba(255,255,255,0.07) 90%)',
                        filter: 'blur(8px)',
                        zIndex: 0,
                        opacity: 0.8,
                    }}
                />
                {/* Imagem 3D do produto */}
                <Box
                    sx={{
                        width: { xs: 210, md: 520 },
                        height: { xs: 210, md: 520 },
                        borderRadius: '50%',
                        overflow: 'hidden',
                        border: '5px solid #fff',
                        background: `url(${levels[watch('level')].image}) center/cover no-repeat`,
                        boxShadow: '0 12px 38px 0 rgba(110,80,60,0.24), 0 2px 24px 0 rgba(250,220,180,0.11)',
                        position: 'relative',
                        zIndex: 1,
                        transition: 'transform .22s, box-shadow .22s',
                        '&:hover': {
                            boxShadow: '0 24px 60px 0 rgba(110,80,60,0.31), 0 3px 32px 0 rgba(250,220,180,0.14)',
                            transform: 'scale(1.045) rotate(-1.5deg)'
                        }
                    }}
                />
            </Stack>

            <Stack gap={9} flex={1}>
                <Typography variant="h1">{title}</Typography>

                <Stack justifyContent="center" alignItems="flex-start">
                    {/* Tabs para selecionar o sabor/torra */}
                    <Tabs
                        value={watch('level')}
                        onChange={(_, newValue) => setValue('level', newValue)}
                        aria-label="opções de sabor/torra"
                        textColor="secondary"
                        indicatorColor="secondary"
                        sx={{
                            mb: 1,
                            minHeight: 48,
                            '.MuiTab-root': { fontSize: 16, fontWeight: 600, minWidth: 90 }
                        }}
                    >
                        {levelLabels.map((label) => (
                            <Tab key={label} label={label} />
                        ))}
                    </Tabs>
                </Stack>

                <Stack>
                    <List>
                        <ListItem disablePadding>
                            <ListItemText
                                slotProps={{ primary: { fontWeight: 'bold' } }}
                                primary="Aroma:"
                                secondary={levels[watch('level')].aroma}
                            />
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemText
                                slotProps={{ primary: { fontWeight: 'bold' } }}
                                primary="Sabor:"
                                secondary={levels[watch('level')].flavor}
                            />
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemText
                                slotProps={{ primary: { fontWeight: 'bold' } }}
                                primary="Cor do grão:"
                                secondary={levels[watch('level')].color}
                            />
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemText
                                slotProps={{ primary: { fontWeight: 'bold' } }}
                                primary="Textura:"
                                secondary={levels[watch('level')].texture}
                            />
                        </ListItem>
                    </List>

                    <Typography variant="subtitle1">
                        {levels[watch('level')].summary}
                    </Typography>
                </Stack>

                 <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 2, sm: 3 }}
                    alignItems="center"
                    sx={{
                        width: '100%',
                        mt: 1,
                        flexWrap: 'wrap',
                        px: { xs: 1, md: 0 },
                    }}
                >
                    <Controller
                        name="type"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                select
                                label="Tipo"
                                size="small"
                                sx={{
                                    minWidth: 90,
                                    bgcolor: '#f8f4f0',
                                    borderRadius: 2,
                                    '.MuiInputBase-input': { fontWeight: 600 }
                                }}
                                InputLabelProps={{ sx: { fontWeight: 700, color: 'secondary.main' } }}
                            >
                                <MenuItem value="1">Grão</MenuItem>
                                <MenuItem value="2">Pó</MenuItem>
                            </TextField>
                        )}
                    />
                    <Controller
                        name="weight"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                select
                                label="Peso"
                                size="small"
                                sx={{
                                    minWidth: 90,
                                    bgcolor: '#f8f4f0',
                                    borderRadius: 2,
                                    '.MuiInputBase-input': { fontWeight: 600 }
                                }}
                                InputLabelProps={{ sx: { fontWeight: 700, color: 'secondary.main' } }}
                            >
                                <MenuItem value="500">500g</MenuItem>
                                <MenuItem value="1000">1KG</MenuItem>
                            </TextField>
                        )}
                    />
                    <Controller
                        name="quantity"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Qtd"
                                type="number"
                                size="small"
                                sx={{
                                    width: 70,
                                    bgcolor: '#f8f4f0',
                                    borderRadius: 2,
                                    '.MuiInputBase-input': { fontWeight: 600 }
                                }}
                                inputProps={{ min: 1, max: 20 }}
                                InputLabelProps={{ sx: { fontWeight: 700, color: 'secondary.main' } }}
                            />
                        )}
                    />
                </Stack>

                <Stack
                    justifyContent="flex-start"
                    alignItems="flex-start"
                >
                    <Button
                        type="submit"
                        startIcon={<ShoppingCartCheckoutRounded />}
                        size="large"
                        color="secondary"
                        variant="contained"
                        sx={{
                            fontWeight: 800,
                            borderRadius: 3,
                            px: 6,
                            minHeight: 54,
                            fontSize: 21,
                            boxShadow: 3,
                            bgcolor: 'secondary.main',
                            letterSpacing: 0.5,
                            mt: { xs: 1, md: 0 },
                            '&:hover': { bgcolor: 'secondary.dark' }
                        }}
                    >
                        Comprar&nbsp;R$&nbsp;
                        {formatCurrency(
                            parseCurrency(String(
                                (watch('weight') === "500" ? levels[watch('level')].price / 2 : levels[watch('level')].price) * Number(watch('quantity') * (Number(watch('type')) === 2 ? 1.2 : 1)) 
                            ))
                        )}
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    )
}

export { ProductCard }
