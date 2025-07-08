// src/actions/promotions/updateCoupon.ts
"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import type { ActionResult } from "../types";
import { normalizeForm } from "../utils";

const updateCouponSchema = z.object({
  id: z.string().uuid("ID inválido"),
  discountType: z.enum(["PERCENTAGE","AMOUNT"]).optional(),
  value: z.preprocess(v => Number(v), z.number().positive()).optional(),
  validFrom: z.string().refine(v => !isNaN(Date.parse(v))).optional(),
  validUntil: z.string().refine(v => !isNaN(Date.parse(v))).optional(),
  maxUses: z.preprocess(v => Number(v), z.number().int().positive()).optional(),
  active: z.preprocess(v => v==="true", z.boolean()).optional()
});

export async function updateCouponAction(
  formData: FormData
): Promise<ActionResult<null>> {
  const { data, errors } = await normalizeForm(updateCouponSchema, formData);
      if (errors) {
          return { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input', fieldErrors: errors } };
       }
    try {
    const dataToUpdate: any = {};
    if (data?.discountType) dataToUpdate.discountType = data?.discountType;
    if (data?.value !== undefined) dataToUpdate.value = data?.value;
    if (data?.validFrom) dataToUpdate.validFrom = new Date(data?.validFrom);
    if (data?.validUntil) dataToUpdate.validUntil = new Date(data?.validUntil);
    if (data?.maxUses !== undefined) dataToUpdate.maxUses = data?.maxUses;
    if (data?.active !== undefined) dataToUpdate.active = data?.active;
    await prisma.coupon.update({ where:{ id: data?.id }, data: dataToUpdate });
    return { success:true, data:null };
  } catch(e) {
    console.error(e);
    return { success:false, error:{ code:"DB_ERROR", message:"Erro ao atualizar cupom" } };
  }
}
