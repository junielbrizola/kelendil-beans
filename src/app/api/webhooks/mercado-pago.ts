import { NextResponse, type NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

// Endpoint para notificações de pagamento do MercadoPago
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id: providerPaymentId, data } = body;
    const { status, external_reference: orderId } = data || {};

    if (!orderId || !status) {
      return NextResponse.json({ error: 'Missing orderId or status' }, { status: 400 });
    }

    const payment = await prisma.payment.findUnique({ where: { orderId } });
    if (!payment) {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
    }

    const newStatus = status.toUpperCase();

    await prisma.payment.update({
      where: { id: payment.id },
      data: { status: newStatus, providerPaymentId }
    });

    await prisma.paymentEvent.create({
      data: {
        paymentId: payment.id,
        type: 'STATUS_CHANGE',
        description: `MercadoPago status changed to ${newStatus}`
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('MercadoPago webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
