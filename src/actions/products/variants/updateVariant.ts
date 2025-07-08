// actions/products/updateVariant.ts
"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import type { ActionResult } from "../../types";
import { normalizeForm } from "@/actions/utils";

// Esquema de validação de entrada
const updateVariantSchema = z.object({
  variantId: z.string().uuid("Invalid variant ID"),
  weightInGrams: z.number().int().positive("Weight must be positive").optional(),
  price: z.preprocess(val => typeof val === "string" ? parseFloat(val) : val,
    z.number().nonnegative("Price must be non-negative")).optional(),
  stock: z.number().int().nonnegative("Stock must be non-negative").optional()
});

type UpdateVariantData = { variantId: string };

export async function updateVariantAction(
  formData: FormData
): Promise<ActionResult<UpdateVariantData>> {
  const { data, errors } = await normalizeForm(updateVariantSchema, formData);
  if (errors) {
    return { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input', fieldErrors: errors } };
  }
  
  try {
    // Prepara dados para atualização
    const dataToUpdate: Record<string, any> = {};
    if (data?.weightInGrams !== undefined) dataToUpdate.weightInGrams = data?.weightInGrams;
    if (data?.price !== undefined) dataToUpdate.price = data?.price;
    if (data?.stock !== undefined) dataToUpdate.stock = data?.stock;

    const variant = await prisma.productVariant.update({
      where: { id: data?.variantId },
      data: dataToUpdate
    });

    return { success: true, data: { variantId: variant.id } };
  } catch (error) {
    console.error("updateVariantAction error:", error);
    return { success: false, error: { code: "DB_ERROR", message: "Error updating variant" } };
  }
}
