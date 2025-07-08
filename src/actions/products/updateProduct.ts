// actions/products/updateProduct.ts
"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import type { ActionResult } from "../types";
import { normalizeForm } from "../utils";

// Esquema de validação de entrada
const updateProductSchema = z.object({
  productId: z.string().uuid("Invalid product ID"),
  name: z.string().min(1, "Product name is required").max(200, "Name too long").optional(),
  description: z.string().max(1000, "Description too long").optional(),
  type: z.enum(["COFFEE", "COCOA"]).optional(),
  imageUrl: z.string().url("Invalid image URL").optional()
});

type UpdateProductData = { productId: string };

export async function updateProductAction(
  formData: FormData
): Promise<ActionResult<UpdateProductData>> {
  const { data, errors } = await normalizeForm(updateProductSchema, formData);
  if (errors) {
    return { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input', fieldErrors: errors } };
  }
  
  try {
    // Atualiza campos permitidos
    const dataToUpdate: Record<string, any> = {};
    if (data?.name !== undefined) dataToUpdate.name = data.name;
    if (data?.description !== undefined) dataToUpdate.description = data.description;
    if (data?.type !== undefined) dataToUpdate.type = data.type;
    if (data?.imageUrl !== undefined) dataToUpdate.imageUrl = data.imageUrl;

    const product = await prisma.product.update({
      where: { id: data?.productId },
      data: dataToUpdate
    });

    return { success: true, data: { productId: product.id } };
  } catch (error) {
    console.error("updateProductAction error:", error);
    return { success: false, error: { code: "DB_ERROR", message: "Error updating product" } };
  }
}
