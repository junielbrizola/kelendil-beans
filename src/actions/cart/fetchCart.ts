// src/actions/cart/fetchCart.ts
"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import type { ActionResult } from "../types";
import { normalizeForm } from "../utils";

const fetchCartSchema = z.object({
  userId: z.string().uuid("Invalid user ID"),
});

type CartItemDetail = {
  variantId: string;
  productName: string;
  imageUrl?: string;
  weightInGrams: number;
  unitPrice: number;
  quantity: number;
  total: number;
};

type FetchCartData = {
  items: CartItemDetail[];
  subtotal: number;
};

export async function fetchCartAction(
  formData: FormData
): Promise<ActionResult<FetchCartData>> {
  const { data, errors } = await normalizeForm(fetchCartSchema, formData);
  if (errors) {
    return { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input', fieldErrors: errors } };
  }
  try {
    const cart = await prisma.cart.findUnique({
      where: { userId: data?.userId },
      include: {
        items: {
          include: {
            variant: {
              include: { product: true }
            }
          }
        }
      }
    });
    if (!cart || cart.items.length === 0) {
      return { success: true, data: { items: [], subtotal: 0 } };
    }
    const items = cart.items.map(item => {
      const price = item.variant.price.toNumber();
      const qty = item.quantity;
      return {
        variantId: item.variantId,
        productName: item.variant.product.name,
        imageUrl: item.variant.product.imageUrl || undefined,
        weightInGrams: item.variant.weightInGrams,
        unitPrice: price,
        quantity: qty,
        total: price * qty,
      };
    });
    const subtotal = items.reduce((sum, it) => sum + it.total, 0);
    return { success: true, data: { items, subtotal } };
  } catch (error) {
    console.error("fetchCartAction error:", error);
    return { success: false, error: { code: "DB_ERROR", message: "Error fetching cart" } };
  }
}
