import { Card, CardContent, CardHeader, Fade, Modal, Stack, Backdrop, Box, Stepper, Step, StepLabel } from '@mui/material'
import * as React from 'react'

interface IModalCheckout {
    open: boolean,
    onClose: () => void
}

const steps = [
  'Endereço',
  'Pagamento',
  'Resumo',
];


const ModalCheckout: React.FC<IModalCheckout> = ({
    open,
    onClose
}) => {
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={onClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={open}>
                <Card 
                    sx={{ 
                        minWidth: 275, 
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    <CardHeader
                        title="Checkout"
                    />
                    <CardContent component={Stack} sx={{ gap: 3 }}>
                        <Box sx={{ width: '100%' }}>
                            <Stepper activeStep={1} alternativeLabel>
                                {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </Box>
                    </CardContent>
                </Card>
            </Fade>
        </Modal>
    )
}

export { ModalCheckout }