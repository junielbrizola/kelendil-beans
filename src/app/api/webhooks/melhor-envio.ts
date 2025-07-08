import { NextResponse, type NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

// Endpoint para notificações de frete do MelhorEnvio
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const shipments = body?.shipments;
    if (!Array.isArray(shipments) || shipments.length === 0) {
      return NextResponse.json({ error: 'No shipments in payload' }, { status: 400 });
    }

    for (const s of shipments) {
      const { status, tracking_code: trackingCode, external_id: orderId } = s;
      if (!orderId) continue;

      const shipment = await prisma.shipment.findUnique({ where: { orderId } });
      if (!shipment) continue;

      const newStatus = status.toUpperCase();

      await prisma.shipment.update({
        where: { id: shipment.id },
        data: { status: newStatus, trackingCode }
      });

      await prisma.orderEvent.create({
        data: {
          orderId,
          type: 'SHIPMENT_UPDATE',
          description: `Shipment updated to ${newStatus}${trackingCode ? ` (Tracking: ${trackingCode})` : ''}`
        }
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('MelhorEnvio webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
