"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import type { ActionResult } from "../types";
import { normalizeForm } from "../utils";

const resetPasswordSchema = z.object({
  token: z.string(),
  password: z.string().min(8, "Senha deve ter ao menos 8 caracteres")
});

export async function resetPasswordAction(
  formData: FormData
): Promise<ActionResult<{}>> {
   const { data, errors } = await normalizeForm(resetPasswordSchema, formData);
      if (errors) {
          return { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input', fieldErrors: errors } };
      }
    const pr = await prisma.passwordResetToken.findUnique({ where: { token: data?.token } });
  if (!pr || pr.expiresAt < new Date()) {
    return { success: false, error: { code: "INVALID_TOKEN", message: "Token inválido ou expirado" } };
  }
  const hashed = await bcrypt.hash(data?.password as string, 12);
  await prisma.user.update({ where: { id: pr.userId }, data: { password: hashed } });
  await prisma.passwordResetToken.deleteMany({ where: { userId: pr.userId } });
  return { success: true, data: {} };
}
