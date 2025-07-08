// src/actions/cart/removeFromCart.ts
"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import type { ActionResult } from "../types";
import { normalizeForm } from "../utils";

// Esquema de validação
const removeFromCartSchema = z.object({
  userId: z.string().uuid("Invalid user ID"),
  variantId: z.string().uuid("Invalid variant ID")
});

type RemoveFromCartData = { cartId: string };

export async function removeFromCartAction(
  formData: FormData
): Promise<ActionResult<RemoveFromCartData>> {
  // Extrai e normaliza dados
  const { data, errors } = await normalizeForm(removeFromCartSchema, formData);
  if (errors) {
    return { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input', fieldErrors: errors } };
  }

  try {
    // Transação para remoção de item do carrinho
    const result = await prisma.$transaction(async (tx: any) => {
      // Verifica carrinho existente
      const cart = await tx.cart.findUnique({ where: { userId: data?.userId } });
      if (!cart) {
        return { success: false, error: { code: "NOT_FOUND", message: "Cart not found" } };
      }

      // Remove o item
      await tx.cartItem.deleteMany({ where: { cartId: cart.id, variantId: data?.variantId } });

      return { success: true, data: { cartId: cart.id } };
    });

    return result;
  } catch (error) {
    console.error("removeFromCartAction error:", error);
    return { success: false, error: { code: "DB_ERROR", message: "Error removing item from cart" } };
  }
}
