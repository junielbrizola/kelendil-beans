// src/actions/users/fetchProfile.ts
"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import type { ActionResult } from "../types";

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
  // 1) Extrai e valida userId
  const raw = Object.fromEntries(formData.entries());
  const parse = fetchProfileSchema.safeParse({ userId: raw.userId || "" });
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
  const { userId } = parse.data;

  try {
    // 2) Busca usuário
    const user = await prisma.user.findUnique({
      where: { id: userId }
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
