"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import type { ActionResult } from "../types";
import { normalizeForm } from "../utils";

const updateUserSchema = z.object({
  id: z.string().uuid("ID inválido"),
  name: z.string().min(1).max(100).optional(),
  email: z.string().email().optional(),
  password: z.string().min(8).optional(),
  role: z.enum(["USER","ADMIN"]).optional()
});

export async function updateUserAction(
  formData: FormData
): Promise<ActionResult<null>> {
  const { data, errors } = await normalizeForm(updateUserSchema, formData);
  if (errors) {
      return { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input', fieldErrors: errors } };
  }
  try {
    const dataToUpdate: any = {};
    if (data?.name) dataToUpdate.name = data?.name;
    if (data?.email) dataToUpdate.email = data?.email;
    if (data?.role) dataToUpdate.role = data?.role;
    if (data?.password) dataToUpdate.password = await bcrypt.hash(data?.password,12);
    await prisma.user.update({ where:{ id: data?.id }, data: dataToUpdate });
    return { success:true, data:null };
  } catch (e) {
    console.error(e);
    return { success:false, error:{ code:"DB_ERROR", message:"Erro ao atualizar usuário" }};
  }
}
