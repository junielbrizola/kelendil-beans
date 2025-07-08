"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import type { ActionResult } from "../types";
import { normalizeForm } from "../utils";

const fetchAdminProductsSchema = z.object({
  search: z.string().optional(),
  page: z.preprocess(v => Number(v), z.number().int().positive().default(1)),
  pageSize: z.preprocess(v => Number(v), z.number().int().min(1).max(100).default(10)),
});

export type AdminProductSummary = {
  id: string;
  name: string;
  type: "COFFEE" | "COCOA";
  createdAt: string;
  variantsCount: number;
};

export type FetchAdminProductsData = {
  products: AdminProductSummary[];
  totalCount: number;
  page: number;
  pageSize: number;
};

export async function fetchAdminProductsAction(
  formData: FormData
): Promise<ActionResult<FetchAdminProductsData>> {
    const { data, errors } = await normalizeForm(fetchAdminProductsSchema, formData);
     if (errors) {
         return { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input', fieldErrors: errors } };
     }
  try {
    const where: any = {};
    if (data?.search) {
      where.name = { contains: data?.search, mode: "insensitive" };
    }
    const [totalCount, productsRaw] = await Promise.all([
      prisma.product.count({ where }),
      prisma.product.findMany({
        where,
        skip: (Number(data?.page) - 1) * Number(data?.pageSize),
        take: data?.pageSize,
        orderBy: { createdAt: "desc" },
        include: { _count: { select: { variants: true } } },
      }),
    ]);
    const products = productsRaw.map((p: any) => ({
      id: p.id,
      name: p.name,
      type: p.type,
      createdAt: p.createdAt.toISOString(),
      variantsCount: p._count.variants,
    }));
    return { success: true, data: { products, totalCount, page: Number(data?.page), pageSize: Number(data?.pageSize) } };
  } catch (error) {
    console.error("fetchAdminProductsAction error:", error);
    return { success: false, error: { code: "DB_ERROR", message: "Error fetching products" } };
  }
}
