export const revalidate = 10;

// src/actions/orders/fetchOrders.ts
"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import type { ActionResult } from "../types";
import { normalizeForm } from "../utils";

// Validação de entrada
const fetchOrdersSchema = z.object({
  status: z.enum(["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"]).optional(),
  userId: z.string().uuid("Invalid user ID").optional(),
  page: z
    .preprocess(val => Number(val), z.number().int().positive().default(1)),
  pageSize: z
    .preprocess(val => Number(val), z.number().int().min(1).max(100).default(10))
});

type OrderSummary = {
  id: string;
  userId: string;
  totalAmount: number;
  status: string;
  createdAt: string;
};

type FetchOrdersData = {
  orders: OrderSummary[];
  totalCount: number;
  page: number;
  pageSize: number;
};

export async function fetchOrdersAction(
  formData: FormData
): Promise<ActionResult<FetchOrdersData>> {
  
  const { data, errors } = await normalizeForm(fetchOrdersSchema, formData);
  if (errors) {
    return { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input', fieldErrors: errors } };
  }
  
  try {
    // Constrói filtro
    const where: any = {};
    if (data?.status) where.status = data?.status;
    if (data?.userId) where.userId = data?.userId;

    // Contagem total
    const totalCount = await prisma.order.count({ where });

    // Busca pedidos paginados
    const ordersRaw = await prisma.order.findMany({
      where,
      skip: (Number(data?.page) - 1) * Number(data?.pageSize),
      take: data?.pageSize,
      orderBy: { createdAt: "desc" }
    });

    const orders = ordersRaw.map((o: any) => ({
      id: o.id,
      userId: o.userId,
      totalAmount: Number(o.totalAmount.toString()),
      status: o.status,
      createdAt: o.createdAt.toISOString()
    }));

    return { success: true, data: { orders, totalCount, page: Number(data?.page), pageSize: Number(data?.pageSize) } };
  } catch (error) {
    console.error("fetchOrdersAction error:", error);
    return { success: false, error: { code: "DB_ERROR", message: "Error fetching orders" } };
  }
}
