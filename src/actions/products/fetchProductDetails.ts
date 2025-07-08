// src/actions/products/fetchProductDetails.ts
"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import type { ActionResult } from "../types";
import { normalizeForm } from "../utils";

const fetchProductDetailsSchema = z.object({
  productId: z.string().uuid("Invalid product ID"),
});

type VariantInfo = {
  id: string;
  weightInGrams: number;
  price: number;
  stock: number;
};

export type ProductDetailData = {
  id: string;
  name: string;
  description?: string;
  type: "COFFEE" | "COCOA";
  imageUrl?: string;
  variants: VariantInfo[];
};

export async function fetchProductDetailsAction(
  formData: FormData
): Promise<ActionResult<ProductDetailData>> {
  const { data, errors } = await normalizeForm(fetchProductDetailsSchema, formData);
  if (errors) {
    return { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input', fieldErrors: errors } };
  }

  try {
    const p = await prisma.product.findUnique({
      where: { id: data?.productId },
      include: { variants: { orderBy: { weightInGrams: "asc" } } }
    });
    if (!p) {
      return { success: false, error: { code: "NOT_FOUND", message: "Product not found" } };
    }
    const variants = p.variants.map(v => ({
      id: v.id,
      weightInGrams: v.weightInGrams,
      price: Number(v.price.toString()),
      stock: v.stock,
    }));
    return {
      success: true,
      data: {
        id: p.id,
        name: p.name,
        description: p.description || undefined,
        type: p.type,
        imageUrl: p.imageUrl || undefined,
        variants,
      }
    };
  } catch (e) {
    console.error("fetchProductDetailsAction error:", e);
    return { success: false, error: { code: "DB_ERROR", message: "Error fetching product details" } };
  }
}
