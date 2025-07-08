// src/actions/users/fetchProfile.ts
"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import type { ActionResult } from "../types";
import { normalizeForm } from "../utils";

const fetchProfileSchema = z.object({
  userId: z.string().uuid("Invalid user ID"),
});

export type ProfileData = {
  id: string;
  name?: string;
  email: string;
};

export async function fetchUserProfileAction(
  formData: FormData
): Promise<ActionResult<ProfileData>> {
   const { data, errors } = await normalizeForm(fetchProfileSchema, formData);
        if (errors) {
            return { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input', fieldErrors: errors } };
        }
  try {
    // 2) Busca usuário
    const user = await prisma.user.findUnique({
      where: { id: data?.userId }
    });
    if (!user) {
      return {
        success: false,
        error: { code: "NOT_FOUND", message: "User not found" }
      };
    }
    // 3) Retorna dados
    return {
      success: true,
      data: {
        id: user.id,
        name: user.name || undefined,
        email: user.email
      }
    };
  } catch (e) {
    console.error("fetchUserProfileAction error:", e);
    return {
      success: false,
      error: { code: "DB_ERROR", message: "Error fetching profile" }
    };
  }
}
