// src/actions/orders/fetchOrderDetails.ts
"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import type { ActionResult } from "../types";
import { normalizeForm } from "../utils";

// Validação de entrada
const fetchOrderDetailsSchema = z.object({
  orderId: z.string().uuid("Invalid order ID")
});

type OrderDetailData = {
  id: string;
  userId: string;
  items: Array<{
    variantId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
  }>;
  totalAmount: number;
  status: string;
  payment: {
    provider: string;
    status: string;
    amount: number;
    installments?: number;
  } | null;
  shipment: {
    provider: string;
    service: string;
    cost: number;
    status: string;
    trackingCode?: string;
    estimatedDelivery?: string;
  } | null;
  events: Array<{
    id: string;
    type: string;
    description?: string;
    createdAt: string;
  }>;
  createdAt: string;
  updatedAt: string;
};

export async function fetchOrderDetailsAction(
  formData: FormData
): Promise<ActionResult<OrderDetailData>> {
  
  const { data, errors } = await normalizeForm(fetchOrderDetailsSchema, formData);
  if (errors) {
    return { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input', fieldErrors: errors } };
  }
  
  try {
    const order = await prisma.order.findUnique({
      where: { id: data?.orderId },
      include: {
        items: { include: { variant: { include: { product: true } } } },
        payment: true,
        shipment: true,
        events: true
      }
    });
    if (!order) {
      return { success: false, error: { code: "NOT_FOUND", message: "Order not found" } };
    }

    const items = order.items.map((item: any) => ({
      variantId: item.variantId,
      productName: item.variant.product.name,
      quantity: item.quantity,
      unitPrice: Number(item.unitPrice.toString())
    }));

    const payment = order.payment
      ? {
          provider: order.payment.provider,
          status: order.payment.status,
          amount: Number(order.payment.amount.toString()),
          installments: order.payment.installments || undefined
        }
      : null;

    const shipment = order.shipment
      ? {
          provider: order.shipment.provider,
          service: order.shipment.service,
          cost: Number(order.shipment.cost.toString()),
          status: order.shipment.status,
          trackingCode: order.shipment.trackingCode || undefined,
          estimatedDelivery: order.shipment.estimatedDelivery
            ? order.shipment.estimatedDelivery.toISOString()
            : undefined
        }
      : null;

    const events = order.events.map((evt: any) => ({
      id: evt.id,
      type: evt.type,
      description: evt.description || undefined,
      createdAt: evt.createdAt.toISOString()
    }));

    return {
      success: true,
      data: {
        id: order.id,
        userId: order.userId,
        items,
        totalAmount: Number(order.totalAmount.toString()),
        status: order.status,
        payment,
        shipment,
        events,
        createdAt: order.createdAt.toISOString(),
        updatedAt: order.updatedAt.toISOString()
      }
    };
  } catch (error) {
    console.error("fetchOrderDetailsAction error:", error);
    return { success: false, error: { code: "DB_ERROR", message: "Error fetching order details" } };
  }
}
