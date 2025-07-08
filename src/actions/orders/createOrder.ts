// actions/orders/createOrder.ts
"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import type { ActionResult } from "../types";
import { normalizeForm } from "../utils";

// Esquema de validação de entrada
const createOrderSchema = z.object({
  userId: z.string().uuid("Invalid user ID"),
  shippingAddress: z.string().min(5, "Address is required"),
  shippingPostalCode: z.string().min(5, "Postal code is required"),
  shippingService: z.string().min(1, "Shipping service required"),
  shippingCost: z.preprocess(val => typeof val === "string" ? parseFloat(val) : val,
    z.number().nonnegative("Invalid shipping cost")),
});

type CreateOrderData = { orderId: string };

export async function createOrderAction(
  formData: FormData
): Promise<ActionResult<CreateOrderData>> {
  try {
  
    const { data, errors } = await normalizeForm(createOrderSchema, formData);
    if (errors) {
      return { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input', fieldErrors: errors } };
    }

    // Obtém itens do carrinho
    const cart = await prisma.cart.findUnique({
      where: { userId: data?.userId },
      include: { items: { include: { variant: true } } }
    });
    if (!cart || cart.items.length === 0) {
      return { success: false, error: { code: "EMPTY_CART", message: "Cart is empty" } };
    }

    // Calcula total de itens
    let itemsTotal = 0;
    const orderItemsData = cart.items.map((item: any) => {
      const unitPrice = item.variant.price;
      itemsTotal += unitPrice.toNumber() * item.quantity;
      return {
        variantId: item.variantId,
        quantity: item.quantity,
        unitPrice
      };
    });
    const totalAmount = itemsTotal + Number(data?.shippingCost);

    // Cria pedido com itens, pagamento e envio inicial
    const order = await prisma.order.create({
      data: {
        userId: data?.userId,
        totalAmount,
        status: "PENDING",
        items: { create: orderItemsData },
        shipment: {
          create: {
            provider: "melhor_envio",
            service: data?.shippingService,
            cost: data?.shippingCost,
            status: "PENDING",
            trackingCode: null
          }
        },
        payment: {
          create: {
            provider: "mercadopago",
            status: "PENDING",
            amount: totalAmount
          }as any
        }
      }
    });

    // Limpa carrinho
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

    return { success: true, data: { orderId: order.id } };
  } catch (error) {
    console.error("createOrderAction error:", error);
    return { success: false, error: { code: "DB_ERROR", message: "Error creating order" } };
  }
}
