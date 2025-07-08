// actions/products/deleteVariant.ts
"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import type { ActionResult } from "../../types";
import { normalizeForm } from "@/actions/utils";

// Esquema de validação de entrada
const deleteVariantSchema = z.object({
  variantId: z.string().uuid("Invalid variant ID")
});

type DeleteVariantData = { variantId: string };

export async function deleteVariantAction(
  formData: FormData
): Promise<ActionResult<DeleteVariantData>> {
  const { data, errors } = await normalizeForm(deleteVariantSchema, formData);
  if (errors) {
    return { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input', fieldErrors: errors } };
  }
  
  try {
    // Remove a variante
    await prisma.productVariant.delete({ where: { id: data?.variantId } });
    return { success: true, data: { variantId: data?.variantId as string } };
  } catch (error) {
    console.error("deleteVariantAction error:", error);
    return { success: false, error: { code: "DB_ERROR", message: "Error deleting variant" } };
  }
}
