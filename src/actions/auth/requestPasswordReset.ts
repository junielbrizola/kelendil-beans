"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { randomBytes } from "crypto";
import { add } from "date-fns";
import { sendPasswordResetEmail } from "@/lib/email";
import type { ActionResult } from "../types";
import { normalizeForm } from "../utils";

const requestPasswordResetSchema = z.object({ email: z.string().email("Email inválido") });

export async function requestPasswordResetAction(
  formData: FormData
): Promise<ActionResult<{}>> {
    const { data, errors } = await normalizeForm(requestPasswordResetSchema, formData);
    if (errors) {
        return { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input', fieldErrors: errors } };
    }
  const user = await prisma.user.findUnique({ where: { email: data?.email } });
  if (!user) {
    // não expõe existência da conta
    return { success: true, data: {} };
  }
  const token = randomBytes(32).toString("hex");
  const expiresAt = add(new Date(), { hours: 1 });
  await prisma.passwordResetToken.create({
    data: { token, userId: user.id, expiresAt }
  });
  const link = `${process.env.NEXTAUTH_URL}/reset-password/${token}`;
  await sendPasswordResetEmail(user?.email, link);
  return { success: true, data: {} };
}
