// actions/payment/createPayment.ts
"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import mercadopago from "@/lib/mercadopago";
import type { ActionResult } from "../types";
import { normalizeForm } from "../utils";

// Validação de entrada
const createPaymentSchema = z.object({
  orderId: z.string().uuid("Invalid order ID")
});

type CreatePaymentData = {
  preferenceId: string;
  initPoint: string;
};

export async function createPaymentAction(
  formData: FormData
): Promise<ActionResult<CreatePaymentData>> {
  const { data, errors } = await normalizeForm(createPaymentSchema, formData);
  if (errors) {
    return { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input', fieldErrors: errors } };
  }
  
  try {
    // Fetch order details with items, user and shipment
    const order = await prisma.order.findUnique({
      where: { id: data?.orderId },
      include: {
        items: { include: { variant: { include: { product: true } } } },
        user: true,
        shipment: true
      }
    });
    if (!order) {
      return { success: false, error: { code: "NOT_FOUND", message: "Order not found" } };
    }

    // Build items array for MercadoPago
    const items = order.items.map((item: any) => ({
      id: item.variantId,
      title: item.variant.product.name,
      description: item.variant.product.description || undefined,
      quantity: item.quantity,
      unit_price: Number(item.unitPrice.toString()),
      currency_id: "BRL"
    }));

    // Prepare preference body
    const body = {
      items,
      payer: { email: order.user.email },
      shipments: {
        mode: "not_specified",
        cost: Number(order.shipment?.cost?.toString() ?? 0)
      },
      back_urls: {
        success: `${process.env.NEXTAUTH_URL}/orders/success`,
        failure: `${process.env.NEXTAUTH_URL}/orders/failure`,
        pending: `${process.env.NEXTAUTH_URL}/orders/pending`
      },
      auto_return: "approved",
      external_reference: order.id
    };

    // Create preference with retry-capable client
    const response = await mercadopago.post("/checkout/preferences", body);
    const { id: preferenceId, init_point: initPoint } = response.data;

    return { success: true, data: { preferenceId, initPoint } };
  } catch (error: any) {
    console.error("createPaymentAction error:", error.response?.data || error);
    return { success: false, error: { code: "API_ERROR", message: "Error creating payment preference" } };
  }
}
