// actions/products/createVariant.ts
"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import type { ActionResult } from "../../types";
import { normalizeForm } from "@/actions/utils";

// Validação de entrada para variante de produto
const createVariantSchema = z.object({
  productId: z.string().uuid("Invalid product ID"),
  weightInGrams: z.number().int().positive("Weight must be positive"),
  price: z.preprocess(val => typeof val === "string" ? parseFloat(val) : val,
    z.number().nonnegative("Price must be non-negative")),
  stock: z.number().int().nonnegative("Stock must be non-negative")
});

type CreateVariantData = { variantId: string };

export async function createVariantAction(
  formData: FormData
): Promise<ActionResult<CreateVariantData>> {
  const { data, errors } = await normalizeForm(createVariantSchema, formData);
  if (errors) {
    return { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input', fieldErrors: errors } };
  }
  
  try {
    // Cria a variante associada ao produto
    const variant = await prisma.productVariant.create({
      data: {
        productId: data?.productId,
        weightInGrams: data?.weightInGrams,
        price: data?.price,
        stock: data?.stock 
      }
    });
    return { success: true, data: { variantId: variant.id } };
  } catch (error) {
    console.error("createVariantAction error:", error);
    return { success: false, error: { code: "DB_ERROR", message: "Error creating variant" } };
  }
}
