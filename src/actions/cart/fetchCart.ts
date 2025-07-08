// src/actions/cart/fetchCart.ts
"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import type { ActionResult } from "../types";
import { normalizeForm } from "../utils";

const fetchCartSchema = z.object({
  userId: z.string().uuid("Invalid user ID")
});

type CartItemData = {
  id: string;
  productId: string;
  name: string;
  imageUrl?: string;
  quantity: number;
  unitPrice: number;
};

type FetchCartData = {
  items: CartItemData[];
  total: number;
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
          include: { variant: { include: { product: true } } }
        }
      }
    });
    if (!cart || cart.items.length === 0) {
      return { success: true, data: { items: [], total: 0 } };
    }
    const items: CartItemData[] = cart.items.map(item => ({
      id: item.id,
      productId: item.variant.product.id,
      name: item.variant.product.name,
      imageUrl: item.variant.product.imageUrl || undefined,
      quantity: item.quantity,
      unitPrice: Number(item.variant.price.toString())
    }));
    const total = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
    return { success: true, data: { items, total } };
  } catch (e) {
    console.error("fetchCartAction error:", e);
    return { success: false, error: { code: "DB_ERROR", message: "Error fetching cart" } };
  }
}
