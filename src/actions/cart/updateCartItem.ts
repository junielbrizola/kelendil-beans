// src/actions/cart/updateCartItem.ts
"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import type { ActionResult } from "../types";
import { normalizeForm } from "../utils";

const updateCartItemSchema = z.object({
  userId: z.string().uuid("Invalid user ID"),
  variantId: z.string().uuid("Invalid variant ID"),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
});

type UpdateCartItemData = { success: true };

export async function updateCartItemAction(
  formData: FormData
): Promise<ActionResult<UpdateCartItemData>> {
    const { data, errors } = await normalizeForm(updateCartItemSchema, formData);
  if (errors) {
    return { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input', fieldErrors: errors } };
  }  
try {
    const cart = await prisma.cart.findUnique({ where: { userId: data?.userId } });
    if (!cart) {
      return { success: false, error: { code: "NOT_FOUND", message: "Cart not found" } };
    }
    await prisma.cartItem.upsert({
      where: { cartId_variantId: { cartId: cart.id, variantId: data?.variantId } },
      update: { quantity: data?.quantity },
      create: { cartId: cart.id, variantId: data?.variantId, quantity: data?.quantity }
    });
    return { success: true, data: { success: true } };
  } catch (error) {
    console.error("updateCartItemAction error:", error);
    return { success: false, error: { code: "DB_ERROR", message: "Error updating cart item" } };
  }
}
