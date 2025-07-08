export const revalidate = 10;

// actions/users/fetchUsers.ts
"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import type { ActionResult } from "../types";
import { normalizeForm } from "../utils";

// Esquema de validação de entrada
const fetchUsersSchema = z.object({
  search: z.string().optional(),
  page: z.preprocess(val => Number(val), z.number().int().positive().default(1)),
  pageSize: z.preprocess(val => Number(val), z.number().int().min(1).max(100).default(10))
});

type UserData = {
  id: string;
  name?: string;
  email: string;
  createdAt: string;
};

type FetchUsersData = {
  users: UserData[];
  totalCount: number;
  page: number;
  pageSize: number;
};

export async function fetchUsersAction(
  formData: FormData
): Promise<ActionResult<FetchUsersData>> {
  const { data, errors } = await normalizeForm(fetchUsersSchema, formData);
  if (errors) {
    return { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input', fieldErrors: errors } };
  }

  try {
    // Monta filtro de busca
    const where: any = {};
    if (data?.search) {
      where.OR = [
        { name: { contains: data?.search, mode: "insensitive" } },
        { email: { contains: data?.search, mode: "insensitive" } }
      ];
    }

    // Contagem total
    const totalCount = await prisma.user.count({ where });

    // Busca usuários com paginação
    const usersRaw = await prisma.user.findMany({
      where,
      skip: (Number(data?.page) - 1) * Number(data?.pageSize),
      take: data?.pageSize,
      orderBy: { createdAt: "desc" }
    });

    const users: UserData[] = usersRaw.map((u: any) => ({
      id: u.id,
      name: u.name || undefined,
      email: u.email,
      createdAt: u.createdAt.toISOString()
    }));

    return { success: true, data: { users, totalCount, page: Number(data?.page), pageSize: Number(data?.pageSize) } };
  } catch (error) {
    console.error("fetchUsersAction error:", error);
    return { success: false, error: { code: "DB_ERROR", message: "Error fetching users" } };
  }
}
