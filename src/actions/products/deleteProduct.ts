// actions/products/deleteProduct.ts
"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import type { ActionResult } from "../types";
import { normalizeForm } from "../utils";

// Esquema de validação de entrada
const deleteProductSchema = z.object({
  productId: z.string().uuid("Invalid product ID")
});

type DeleteProductData = { productId: string };

export async function deleteProductAction(
  formData: FormData
): Promise<ActionResult<DeleteProductData>> {
  const { data, errors } = await normalizeForm(deleteProductSchema, formData);
  if (errors) {
    return { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input', fieldErrors: errors } };
  }
  
  try {
    // Remove variantes associadas
    await prisma.productVariant.deleteMany({ where: { productId: data?.productId } });
    // Remove o produto
    await prisma.product.delete({ where: { id: data?.productId } });
    return { success: true, data: { productId: data?.productId as string } };
  } catch (error) {
    console.error("deleteProductAction error:", error);
    return { success: false, error: { code: "DB_ERROR", message: "Error deleting product" } };
  }
}
