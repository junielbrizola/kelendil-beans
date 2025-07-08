"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import type { ActionResult } from "../types";
import { normalizeForm } from "../utils";

const createUserSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(100),
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Senha deve ter ao menos 8 caracteres"),
  role: z.enum(["USER", "ADMIN"]).default("USER")
});

type CreateUserData = { userId: string };

export async function createUserAction(
  formData: FormData
): Promise<ActionResult<CreateUserData>> {
   const { data, errors } = await normalizeForm(createUserSchema, formData);
      if (errors) {
          return { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input', fieldErrors: errors } };
      }
    try {
    const exists = await prisma.user.findUnique({ where:{ email: data?.email } });
    if (exists) {
      return { success:false, error:{ code:"EMAIL_TAKEN", message:"Email já cadastrado" }};
    }
    const hash = await bcrypt.hash(data?.password as string, 12);
    const user = await prisma.user.create({ data:{ name: data?.name, email: data?.email, password:hash, role: data?.role }});
    return { success:true, data:{ userId: user.id }};
  } catch (e) {
    console.error(e);
    return { success:false, error:{ code:"DB_ERROR", message:"Erro ao criar usuário" }};
  }
}
