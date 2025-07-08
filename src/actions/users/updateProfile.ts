// src/actions/users/updateProfile.ts
"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import type { ActionResult } from "../types";

const updateProfileSchema = z.object({
  userId: z.string().uuid("Invalid user ID"),
  name: z.string().min(1, "Name is required").max(100, "Name too long").optional(),
  email: z.string().email("Invalid email").optional(),
  password: z.string().min(8, "Password must be at least 8 characters").optional()
});

export async function updateUserProfileAction(
  formData: FormData
): Promise<ActionResult<{}>> {
  // 1) Extrai e valida
  const raw = Object.fromEntries(formData.entries());
  const parse = updateProfileSchema.safeParse({
    userId: raw.userId || "",
    name: raw.name || undefined,
    email: raw.email || undefined,
    password: raw.password || undefined
  });
  if (!parse.success) {
    const fieldErrors: Record<string,string> = {};
    parse.error.errors.forEach(err => {
      fieldErrors[err.path[0] as string] = err.message;
    });
    return {
      success: false,
      error: { code: "VALIDATION_ERROR", message: "Invalid input", fieldErrors }
    };
  }
  const { userId, name, email, password } = parse.data;

  try {
    // 2) Monta payload de atualização
    const dataToUpdate: any = {};
    if (name !== undefined) dataToUpdate.name = name;
    if (email !== undefined) dataToUpdate.email = email;
    if (password !== undefined) {
      dataToUpdate.password = await bcrypt.hash(password, 12);
    }

    // 3) Atualiza usuário
    await prisma.user.update({
      where: { id: userId },
      data: dataToUpdate
    });

    return { success: true, data: {} };
  } catch (e) {
    console.error("updateUserProfileAction error:", e);
    return {
      success: false,
      error: { code: "DB_ERROR", message: "Error updating profile" }
    };
  }
}
