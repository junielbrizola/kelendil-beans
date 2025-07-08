// src/actions/users/updateProfile.ts
"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import type { ActionResult } from "../types";
import { normalizeForm } from "../utils";

const updateProfileSchema = z.object({
  userId: z.string().uuid("Invalid user ID"),
  name: z.string().min(1, "Name is required").max(100, "Name too long").optional(),
  email: z.string().email("Invalid email").optional(),
  password: z.string().min(8, "Password must be at least 8 characters").optional()
});

export async function updateUserProfileAction(
  formData: FormData
): Promise<ActionResult<{}>> {
    const { data, errors } = await normalizeForm(updateProfileSchema, formData);
          if (errors) {
              return { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input', fieldErrors: errors } };
          }
  try {
    // 2) Monta payload de atualização
    const dataToUpdate: any = {};
    if (data?.name !== undefined) dataToUpdate.name = data?.name;
    if (data?.email !== undefined) dataToUpdate.email = data?.email;
    if (data?.password !== undefined) {
      dataToUpdate.password = await bcrypt.hash(data?.password, 12);
    }

    // 3) Atualiza usuário
    await prisma.user.update({
      where: { id: data?.userId },
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
