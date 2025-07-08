// actions/cart/addToCart.ts
"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import type { ActionResult } from "../types";
import { normalizeForm } from "../utils";

// Esquema de validação da entrada
const addToCartSchema = z.object({
  userId: z.string().uuid("Invalid user ID"),
  variantId: z.string().uuid("Invalid product variant ID"),
  quantity: z.number().int().min(1, "Quantity must be at least 1")
});

type AddToCartData = { cartId: string };

export async function addToCartAction(
  formData: FormData
): Promise<ActionResult<AddToCartData>> {
  try {
 
    const { data, errors } = await normalizeForm(addToCartSchema, formData);
    if (errors) {
      return { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input', fieldErrors: errors } };
    }

    // Busca ou cria carrinho do usuário
    let cart = await prisma.cart.findUnique({ where: { userId: data?.userId } });
    if (!cart) {
      cart = await prisma.cart.create({ data: { userId: data?.userId } });
    }

    // Tenta atualizar item existente
    const existingItem = await prisma.cartItem.findUnique({
      where: { cartId_variantId: { cartId: cart.id, variantId: data?.variantId } }
    });
    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + data?.quantity }
      });
    } else {
      await prisma.cartItem.create({
        data: { cartId: cart.id, variantId: data?.variantId, quantity: data?.quantity }
      });
    }

    return { success: true, data: { cartId: cart.id } };
  } catch (e) {
    return { success: false, error: { code: "DB_ERROR", message: "Error updating cart" } };
  }
}