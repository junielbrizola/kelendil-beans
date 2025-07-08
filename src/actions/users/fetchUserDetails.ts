"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import type { ActionResult } from "../types";
import { normalizeForm } from "../utils";

// Validação de entrada
const fetchUserDetailsSchema = z.object({
  userId: z.string().uuid("Invalid user ID"),
});

export type UserDetailData = {
  id: string;
  name?: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

export async function fetchUserDetailsAction(
  formData: FormData
): Promise<ActionResult<UserDetailData>> {
  
    const { data, errors } = await normalizeForm(fetchUserDetailsSchema, formData);
    if (errors) {
        return { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input', fieldErrors: errors } };
    }

  try {
    const user = await prisma.user.findUnique({ where: { id: data?.userId } });
    if (!user) {
      return { success: false, error: { code: "NOT_FOUND", message: "User not found" } };
    }
    return {
      success: true,
      data: {
        id: user.id,
        name: user.name || undefined,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      },
    };
  } catch (error) {
    console.error("fetchUserDetailsAction error:", error);
    return {
      success: false,
      error: { code: "DB_ERROR", message: "Error fetching user details" },
    };
  }
}
