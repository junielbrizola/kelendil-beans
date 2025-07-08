export const revalidate = 10;

// actions/products/fetchProducts.ts
"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import type { ActionResult } from "../types";
import { normalizeForm } from "../utils";

// Esquema de validação de entrada
const fetchProductsSchema = z.object({
  search: z.string().optional(),
  type: z.enum(["COFFEE", "COCOA"]).optional(),
  page: z.preprocess(val => Number(val), z.number().int().positive().default(1)),
  pageSize: z
    .preprocess(val => Number(val), z.number().int().min(1).max(100).default(10))
});

type ProductData = {
  id: string;
  name: string;
  description?: string;
  type: "COFFEE" | "COCOA";
  imageUrl?: string;
};

type FetchProductsData = {
  products: ProductData[];
  totalCount: number;
  page: number;
  pageSize: number;
};

export async function fetchProductsAction(
  formData: FormData
): Promise<ActionResult<FetchProductsData>> {
  const { data, errors } = await normalizeForm(fetchProductsSchema, formData);
  if (errors) {
    return { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input', fieldErrors: errors } };
  }
  
  try {
    // Monta filtros
    const where: any = {};
    if (data?.search) {
      where.name = { contains: data?.search, mode: "insensitive" };
    }
    if (data?.type) {
      where.type = data?.type;
    }

    // Contagem total
    const totalCount = await prisma.product.count({ where });

    // Busca produtos com paginação
    const productsRaw = await prisma.product.findMany({
      where,
      skip: (Number(data?.page) - 1) * Number(data?.pageSize),
      take: data?.pageSize,
      orderBy: { createdAt: "desc" }
    });

    const products: ProductData[] = productsRaw.map((p: any) => ({
      id: p.id,
      name: p.name,
      description: p.description || undefined,
      type: p.type,
      imageUrl: p.imageUrl || undefined
    }));

    return {
      success: true,
      data: { products, totalCount, page: Number(data?.page), pageSize: Number(data?.pageSize) }
    };
  } catch (error) {
    console.error("fetchProductsAction error:", error);
    return { success: false, error: { code: "DB_ERROR", message: "Error fetching products" } };
  }
}
