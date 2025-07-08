// src/actions/cart/updateCartItem.ts
"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import type { ActionResult } from "../types";
import { normalizeForm } from "../utils";

const updateCartItemSchema = z.object({
  userId: z.string().uuid("Invalid user ID"),
  variantId: z.string().uuid("Invalid variant ID"),
  quantity: z.number().int().min(0, "Quantity must be >= 0")
});

export async function updateCartItemAction(
  formData: FormData
): Promise<ActionResult<null>> {
   const { data, errors } = await normalizeForm(updateCartItemSchema, formData);
    if (errors) {
      return { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input', fieldErrors: errors } };
    }
  try {
    // if quantity === 0 remove, else update
    const cart = await prisma.cart.findUnique({ where:{ userId: data?.userId }});
    if (!cart) return { success:false, error:{ code:"NOT_FOUND", message:"Cart not found" }};
    if (data?.quantity === 0) {
      await prisma.cartItem.deleteMany({ where:{ cartId: cart.id, variantId: data?.variantId } });
    } else {
      await prisma.cartItem.upsert({
        where: { cartId_variantId: { cartId: cart.id, variantId: data?.variantId }},
        update: { quantity: data?.quantity },
        create: { cartId: cart.id, variantId: data?.variantId, quantity: data?.quantity }
      });
    }
    return { success:true, data:null };
  } catch(e) {
    console.error(e);
    return { success:false, error:{ code:"DB_ERROR", message:"Error updating cart item" }};
  }
}
