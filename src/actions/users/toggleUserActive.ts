"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import type { ActionResult } from "../types";
import { normalizeForm } from "../utils";

const toggleUserSchema = z.object({
  id: z.string().uuid("ID inválido"),
  active: z.boolean()
});

export async function toggleUserActiveAction(
  formData: FormData
): Promise<ActionResult<null>> {
  const { data, errors } = await normalizeForm(toggleUserSchema, formData);
    if (errors) {
      return { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input', fieldErrors: errors } };
    }
  try {
    await prisma.user.update({
      where:{ id: data?.id },
      data:{ deletedAt: data?.active ? null : new Date() }
    });
    return { success:true, data:null };
  } catch (e) {
    console.error(e);
    return { success:false, error:{ code:"DB_ERROR", message:"Erro ao atualizar status" }};
  }
}
