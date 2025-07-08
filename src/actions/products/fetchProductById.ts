// src/actions/products/fetchProductById.ts
"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import type { ActionResult } from "../types";
import { normalizeForm } from "../utils";

const fetchProductByIdSchema = z.object({
  productId: z.string().uuid("ID de produto inválido")
});

export type ProductDetailData = {
  id: string;
  name: string;
  description?: string;
  type: "COFFEE" | "COCOA";
  imageUrl?: string;
  variants: Array<{
    id: string;
    weightInGrams: number;
    price: number;
    stock: number;
  }>;
};

export async function fetchProductByIdAction(
  formData: FormData
): Promise<ActionResult<ProductDetailData>> {
    const { data, errors } = await normalizeForm(fetchProductByIdSchema, formData);
   if (errors) {
     return { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input', fieldErrors: errors } };
   }
  try {
    const p = await prisma.product.findUnique({
      where: { id: data?.productId },
      include: { variants: true }
    });
    if (!p) {
      return { success:false, error:{ code:"NOT_FOUND", message:"Produto não encontrado" } };
    }
    return {
      success: true,
      data: {
        id: p.id,
        name: p.name,
        description: p.description || undefined,
        type: p.type,
        imageUrl: p.imageUrl || undefined,
        variants: p.variants.map(v => ({
          id: v.id,
          weightInGrams: v.weightInGrams,
          price: Number(v.price.toString()),
          stock: v.stock
        }))
      }
    };
  } catch (e) {
    console.error(e);
    return { success:false, error:{ code:"DB_ERROR", message:"Erro ao buscar produto" } };
  }
}
