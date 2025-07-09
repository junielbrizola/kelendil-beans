"use server";

import { z } from "zod";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import type { ActionResult } from "../types";
import { normalizeForm } from "../utils";

const signupSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(100, "Nome muito longo"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(8, "Senha mínima de 8 caracteres")
});

export type SignupData = {
  id: string;
  name: string;
  email: string;
};

export async function signupAction(
  formData: FormData
): Promise<ActionResult<SignupData>> {
  const { data, errors } = await normalizeForm(signupSchema, formData);
        if (errors) {
            return { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input', fieldErrors: errors } };
        }
  // 2) Checar email existente
  const existing = await prisma.user.findUnique({ where: { email: data?.email } });
  if (existing) {
    return {
      success: false,
      error: {
        code: "EMAIL_TAKEN",
        message: "E-mail já está em uso",
        fieldErrors: { email: "Esse e-mail já foi cadastrado" }
      }
    };
  }

  // 3) Hash da senha e criação
  const hashed = await bcrypt.hash(data?.password as string, 12);
  const user = await prisma.user.create({
    data: { name: data?.name, email: data?.email, password: hashed }
  });

  return {
    success: true,
    data: { id: user.id, name: user.name || "", email: user.email }
  };
}
