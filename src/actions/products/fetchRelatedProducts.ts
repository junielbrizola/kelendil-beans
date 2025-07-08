// src/actions/products/fetchRelatedProducts.ts
"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import type { ActionResult } from "../types";
import { normalizeForm } from "../utils";

const fetchRelatedSchema = z.object({
  productId: z.string().uuid("Invalid product ID"),
  type: z.enum(["COFFEE", "COCOA"])
});

export type RelatedProduct = {
  id: string;
  name: string;
  imageUrl?: string;
  variants: Array<{ id: string; price: number }>;
};

export async function fetchRelatedProductsAction(
  formData: FormData
): Promise<ActionResult<RelatedProduct[]>> {
    const { data, errors } = await normalizeForm(fetchRelatedSchema, formData);
  if (errors) {
    return { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input', fieldErrors: errors } };
  }  
try {
    const products = await prisma.product.findMany({
      where: { type: data?.type, deletedAt: null, id: { not: data?.productId } },
      take: 4,
      orderBy: { createdAt: "desc" },
      include: { variants: { orderBy: { price: "asc" }, take: 1 } }
    });
    const related = products.map(p => ({
      id: p.id,
      name: p.name,
      imageUrl: p.imageUrl || undefined,
      variants: p.variants.map(v => ({ id: v.id, price: Number(v.price.toString()) }))
    }));
    return { success: true, data: related };
  } catch (e) {
    console.error("fetchRelatedProductsAction error:", e);
    return { success: false, error: { code: "DB_ERROR", message: "Error fetching related products" } };
  }
}
