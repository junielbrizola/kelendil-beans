'use client'
import { AddShoppingCartRounded } from '@mui/icons-material'
import {
    Button,
    ButtonGroup,
    List,
    ListItem,
    ListItemText,
    MenuItem,
    Stack,
    TextField,
    Typography
} from '@mui/material'
import * as React from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
    formatCurrency,
    parseCurrency
} from '@brazilian-utils/brazilian-utils'
import { ModalCheckout } from './modalCheckout'

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

const ProductCard: React.FC<IProductCard> = ({
  inverted = false,
  levels,
  title
}) => {

    const [openCheckout, setOpenCheckout] = React.useState(false)

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
            setOpenCheckout(true)
        } catch (e) {
            console.log({ e })
        }
    }, [levels, title])

    return (
        <>
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
                        height: '600px',
                        width: '600px',
                        backgroundPosition: 'center',
                        backgroundImage: `url(${levels[watch('level')].image})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain'
                    }}
                />

                <Stack gap={9} flex={1}>
                    <Typography variant="h1">{title}</Typography>

                    <Stack justifyContent="center" alignItems="flex-start">
                        <Stack gap={3} flexDirection="row" alignItems="center">
                            <ButtonGroup variant="outlined" aria-label="Basic button group">
                                {['Leve', 'Médio', 'Médio Escuro', 'Escuro'].map(
                                    (label, idx) => (
                                        <Button
                                            key={label}
                                            onClick={() => setValue('level', idx)}
                                            variant={watch('level') === idx ? 'contained' : 'outlined'}
                                        >
                                            {label}
                                        </Button>
                                    )
                            )}
                            </ButtonGroup>
                            
                        </Stack>
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
                        gap={15}
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="flex-start"
                        flexWrap="wrap"
                    >
                        <Controller
                            name="type"
                            control={control}
                            render={({ field }) => (
                                <Stack
                                    gap={3}
                                    justifyContent="flex-start"
                                    flexDirection="row"
                                    alignItems="center"
                                >
                                    <Typography>Tipo</Typography>
                                    <TextField
                                        {...field}
                                        select
                                        variant="standard"
                                    >
                                        <MenuItem value="1">Grão</MenuItem>
                                        <MenuItem value="2">Pó</MenuItem>
                                    </TextField>
                                </Stack>
                            )}
                        />

                        <Controller
                            name="weight"
                            control={control}
                            render={({ field }) => (
                                <Stack
                                    gap={3}
                                    justifyContent="flex-start"
                                    flexDirection="row"
                                    alignItems="center"
                                >
                                    <Typography>Peso</Typography>
                                    <TextField
                                        {...field}
                                        select
                                        variant="standard"
                                    >
                                        <MenuItem value="500">500g</MenuItem>
                                        <MenuItem value="1000">1KG</MenuItem>
                                    </TextField>
                                </Stack>
                            )}
                        />

                        <Controller
                            name="quantity"
                            control={control}
                            render={({ field }) => (
                                <Stack
                                    gap={3}
                                    flexDirection="row"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                >
                                    <Typography>Quantidade</Typography>
                                    <TextField
                                        {...field}
                                        type="number"
                                        variant="standard"
                                        sx={{ width: '50px' }}
                                    />
                                </Stack>
                            )}
                        />
                    </Stack>

                    <Button
                        type="submit"
                        startIcon={<AddShoppingCartRounded />}
                    >
                        R${' '}
                        {formatCurrency(
                            parseCurrency(String(
                                (watch('weight') === "500" ? levels[watch('level')].price / 2 : levels[watch('level')].price) * Number(watch('quantity') * (Number(watch('type')) === 2 ? 1.2 : 1)) 
                            ))
                        )}
                    </Button>
                </Stack>
            </Stack>
            <ModalCheckout 
                open={openCheckout}
                onClose={() => setOpenCheckout(false)}
            />
        </>
    )
}

export { ProductCard }
