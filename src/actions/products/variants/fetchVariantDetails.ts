"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import type { ActionResult } from "../../types";
import { normalizeForm } from "@/actions/utils";

const fetchVariantDetailsSchema = z.object({
  variantId: z.string().uuid("Invalid variant ID")
});

type Data = {
  id: string;
  weightInGrams: number;
  price: number;
  stock: number;
};

export async function fetchVariantDetailsAction(
  formData: FormData
): Promise<ActionResult<Data>> {
  
    const { data, errors } = await normalizeForm(fetchVariantDetailsSchema, formData);
    if (errors) {
      return { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input', fieldErrors: errors } };
    }


  try {
    const v = await prisma.productVariant.findUnique({ where: { id: data?.variantId } });
    if (!v) return { success: false, error: { code: "NOT_FOUND", message: "Variant not found" } };
    return {
      success: true,
      data: {
        id: v.id,
        weightInGrams: v.weightInGrams,
        price: Number(v.price.toString()),
        stock: v.stock
      }
    };
  } catch (e) {
    console.error("fetchVariantDetailsAction error:", e);
    return { success: false, error: { code: "DB_ERROR", message: "Error fetching variant details" } };
  }
}
