import { Card, CardContent, CardHeader, Fade, Modal, Stack, Backdrop } from '@mui/material'
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineOppositeContent, TimelineSeparator } from '@mui/lab'
import * as React from 'react'

interface IModalTracking {
    open: boolean,
    onClose: () => void
}

const ModalTracking: React.FC<IModalTracking> = ({
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
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    <CardHeader
                        title="Rastrear pedido"
                    />
                    <CardContent component={Stack} sx={{ gap: 3 }}>
                        <Timeline>
                            <TimelineItem>
                                <TimelineOppositeContent color="text.secondary">
                                    09:30 am
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    <TimelineDot />
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>Eat</TimelineContent>
                            </TimelineItem>
                            <TimelineItem>
                                <TimelineOppositeContent color="text.secondary">
                                    10:00 am
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    <TimelineDot />
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>Code</TimelineContent>
                            </TimelineItem>
                            <TimelineItem>
                                <TimelineOppositeContent color="text.secondary">
                                    12:00 am
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    <TimelineDot />
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>Sleep</TimelineContent>
                            </TimelineItem>
                            <TimelineItem>
                                <TimelineOppositeContent color="text.secondary">
                                    9:00 am
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    <TimelineDot />
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>Repeat</TimelineContent>
                            </TimelineItem>
                        </Timeline>
                    </CardContent>
                </Card>
            </Fade>
        </Modal>
    )
}

export { ModalTracking }