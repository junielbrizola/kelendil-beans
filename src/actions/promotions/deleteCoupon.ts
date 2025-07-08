// src/actions/promotions/deleteCoupon.ts
"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import type { ActionResult } from "../types";
import { normalizeForm } from "../utils";

const deleteCouponSchema = z.object({
  id: z.string().uuid("ID inválido")
});

export async function deleteCouponAction(
  formData: FormData
): Promise<ActionResult<null>> {
  const { data, errors } = await normalizeForm(deleteCouponSchema, formData);
if (errors) {
    return { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input', fieldErrors: errors } };
}
  try {
    await prisma.coupon.delete({ where:{ id: data?.id } });
    return { success:true, data:null };
  } catch(e) {
    console.error(e);
    return { success:false, error:{ code:"DB_ERROR", message:"Erro ao deletar cupom" } };
  }
}
