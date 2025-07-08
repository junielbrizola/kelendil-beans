// src/actions/orders/updateOrderStatus.ts
"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import type { ActionResult } from "../types";
import { normalizeForm } from "../utils";

const updateOrderStatusSchema = z.object({
  orderId: z.string().uuid("Invalid order ID"),
  status: z.enum(["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"])
});

export async function updateOrderStatusAction(
  formData: FormData
): Promise<ActionResult<null>> {
    const { data, errors } = await normalizeForm(updateOrderStatusSchema, formData);
    if (errors) {
        return { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input', fieldErrors: errors } };
    }
  try {
    // Atualiza status e adiciona evento
    await prisma.$transaction(async tx => {
      await tx.order.update({ where: { id: data?.orderId }, data: { status: data?.status } });
      await tx.orderEvent.create({
        data: {
          orderId: data?.orderId,
          type: "STATUS_CHANGE",
          description: `Status alterado para ${status}`
        }
      });
    });
    return { success: true, data: null };
  } catch (e) {
    console.error("updateOrderStatusAction:", e);
    return { success: false, error: { code: "DB_ERROR", message: "Erro ao atualizar status" } };
  }
}
