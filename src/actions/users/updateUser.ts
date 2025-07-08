"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import type { ActionResult } from "../types";
import { normalizeForm } from "../utils";

const updateUserSchema = z.object({
  userId: z.string().uuid("Invalid user ID"),
  name: z.string().min(1, "Name is required").max(100).optional(),
  password: z.string().min(8, "Password must be at least 8 characters").optional()
});

export type UpdateUserData = { id: string; name?: string; email: string };

export async function updateUserAction(
  formData: FormData
): Promise<ActionResult<UpdateUserData>> {
    const { data, errors } = await normalizeForm(updateUserSchema, formData);
    if (errors) {
        return { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input', fieldErrors: errors } };
    }

  const dataToUpdate: any = {};
  if (data?.name !== undefined) dataToUpdate.name = name;
  if (data?.password !== undefined) {
    dataToUpdate.password = await bcrypt.hash(data?.password, 12);
  }

  try {
    const updated = await prisma.user.update({
      where: { id: data?.userId },
      data: dataToUpdate
    });
    return { success: true, data: { id: updated.id, name: updated.name, email: updated.email } };
  } catch (error) {
    console.error("updateUserAction error:", error);
    return { success: false, error: { code: "DB_ERROR", message: "Error updating user" } };
  }
}
