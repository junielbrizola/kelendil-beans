"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import type { ActionResult } from "../types";
import { normalizeForm } from "../utils";

// Esquema de validação de entrada
const createProductSchema = z.object({
  name: z.string().min(1, "Product name is required").max(200, "Name too long"),
  description: z.string().max(1000, "Description too long").optional(),
  type: z.enum(["COFFEE", "COCOA"]),
  imageUrl: z.string().url("Invalid image URL").optional()
});

type CreateProductData = { productId: string };

export async function createProductAction(
  formData: FormData
): Promise<ActionResult<CreateProductData>> {
  const { data, errors } = await normalizeForm(createProductSchema, formData);
  if (errors) {
    return { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input', fieldErrors: errors } };
  }

  try {
    // Cria produto
    const product = await prisma.product.create({
      data: {
        name: data?.name,
        description: data?.description,
        type: data?.type,
        imageUrl: data?.imageUrl
      }
    });
    return { success: true, data: { productId: product.id } };
  } catch (error) {
    console.error("createProductAction error:", error);
    return { success: false, error: { code: "DB_ERROR", message: "Error creating product" } };
  }
}
