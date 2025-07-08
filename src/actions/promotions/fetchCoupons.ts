// src/actions/promotions/fetchCoupons.ts
"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import type { ActionResult } from "../types";
import { normalizeForm } from "../utils";

const fetchCouponsSchema = z.object({
  page: z.preprocess(v => Number(v), z.number().int().positive().default(1)),
  pageSize: z.preprocess(v => Number(v), z.number().int().min(1).max(100).default(10)),
  active: z.preprocess(v => v === "true", z.boolean()).optional()
});

export type CouponData = {
  id: string;
  code: string;
  discountType: "PERCENTAGE" | "AMOUNT";
  value: number;
  validFrom: string;
  validUntil: string;
  maxUses?: number;
  usesCount: number;
  active: boolean;
};

type FetchCouponsResult = {
  coupons: CouponData[];
  totalCount: number;
  page: number;
  pageSize: number;
};

export async function fetchCouponsAction(
  formData: FormData
): Promise<ActionResult<FetchCouponsResult>> {
    const { data, errors } = await normalizeForm(fetchCouponsSchema, formData);
    if (errors) {
        return { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input', fieldErrors: errors } };
    }

  try {
    const where: any = {};
    if (data?.active !== undefined) where.active = data?.active;

    const totalCount = await prisma.coupon.count({ where });
    const rawCoupons = await prisma.coupon.findMany({
      where,
      skip: (Number(data?.page) - 1) * Number(data?.pageSize),
      take: data?.pageSize,
      orderBy: { createdAt: "desc" }
    });

    const coupons: CouponData[] = rawCoupons.map(c => ({
      id: c.id,
      code: c.code,
      discountType: c.discountType,
      value: Number(c.value.toString()),
      validFrom: c.validFrom.toISOString(),
      validUntil: c.validUntil.toISOString(),
      maxUses: c.maxUses ?? undefined,
      usesCount: c.usesCount,
      active: c.active
    }));

    return { success:true, data:{ coupons, totalCount, page: Number(data?.page), pageSize: Number(data?.pageSize) } };
  } catch (e) {
    console.error(e);
    return { success:false, error:{ code:"DB_ERROR", message:"Erro ao buscar cupons" } };
  }
}
