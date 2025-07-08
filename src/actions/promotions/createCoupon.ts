// src/actions/promotions/createCoupon.ts
"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import type { ActionResult } from "../types";
import { normalizeForm } from "../utils";

const createCouponSchema = z.object({
  code: z.string().min(1, "Código obrigatório"),
  discountType: z.enum(["PERCENTAGE","AMOUNT"]),
  value: z.number().positive("Valor deve ser positivo"),
  validFrom: z.string().refine(v => !isNaN(Date.parse(v)), "Data inválida"),
  validUntil: z.string().refine(v => !isNaN(Date.parse(v)), "Data inválida"),
  maxUses: z.preprocess(v => v===undefined?undefined:Number(v), z.number().int().positive().optional()),
  active: z.preprocess(v => v === "true", z.boolean()).optional()
});

type CreateCouponData = { couponId: string };

export async function createCouponAction(
  formData: FormData
): Promise<ActionResult<CreateCouponData>> {
  const { data, errors } = await normalizeForm(createCouponSchema, formData);
      if (errors) {
          return { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input', fieldErrors: errors } };
      }
  try {
    const existing = await prisma.coupon.findUnique({ where:{ code: data?.code } });
    if (existing) {
      return { success:false, error:{ code:"CODE_TAKEN", message:"Código já existe" } };
    }
    const coupon = await prisma.coupon.create({
      data:{
        code: data?.code,
        discountType: data?.discountType,
        value: data?.value,
        validFrom:  new Date(data?.validFrom),
        validUntil: new Date(data?.validUntil),
        maxUses: data?.maxUses,
        active: data?.active ?? true
      }
    });
    return { success:true, data:{ couponId: coupon.id } };
  } catch(e) {
    console.error(e);
    return { success:false, error:{ code:"DB_ERROR", message:"Erro ao criar cupom" } };
  }
}
