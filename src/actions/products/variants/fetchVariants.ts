export const revalidate = 10;

// actions/products/fetchVariants.ts
"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import type { ActionResult } from "../../types";
import { normalizeForm } from "@/actions/utils";

// Esquema de validação de entrada
const fetchVariantsSchema = z.object({
  productId: z.string().uuid("Invalid product ID"),
  page: z.preprocess(val => Number(val), z.number().int().positive().default(1)),
  pageSize: z.preprocess(val => Number(val), z.number().int().min(1).max(100).default(10))
});

type VariantData = {
  id: string;
  weightInGrams: number;
  price: number;
  stock: number;
  createdAt: string;
  updatedAt: string;
};

type FetchVariantsData = {
  variants: VariantData[];
  totalCount: number;
  page: number;
  pageSize: number;
};

export async function fetchVariantsAction(
  formData: FormData
): Promise<ActionResult<FetchVariantsData>> {
  const { data, errors } = await normalizeForm(fetchVariantsSchema, formData);
  if (errors) {
    return { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input', fieldErrors: errors } };
  }
  
  try {
    // Contagem total de variantes
    const totalCount = await prisma.productVariant.count({ where: { productId: data?.productId } });

    // Busca variantes com paginação
    const variantsRaw = await prisma.productVariant.findMany({
      where: { productId: data?.productId },
      skip: (Number(data?.page) - 1) * Number(data?.pageSize),
      take: data?.pageSize,
      orderBy: { weightInGrams: "asc" }
    });

    const variants: VariantData[] = variantsRaw.map((v: any) => ({
      id: v.id,
      weightInGrams: v.weightInGrams,
      price: v.price.toNumber(),
      stock: v.stock,
      createdAt: v.createdAt.toISOString(),
      updatedAt: v.updatedAt.toISOString()
    }));

    return { success: true, data: { variants, totalCount, page: Number(data?.page), pageSize: Number(data?.pageSize) } };
  } catch (error) {
    console.error("fetchVariantsAction error:", error);
    return {
      success: false,
      error: { code: "DB_ERROR", message: "Error fetching variants" }
    };
  }
}
