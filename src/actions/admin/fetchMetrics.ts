"use server";
import prisma from "@/lib/prisma";
import type { ActionResult } from "../types";

export type AdminMetrics = {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
};

export async function fetchAdminMetricsAction(): Promise<ActionResult<AdminMetrics>> {
  try {
    const [totalUsers, totalProducts, totalOrders, revenueAgg] = await Promise.all([
      prisma.user.count(),
      prisma.product.count({ where: { deletedAt: null } }),
      prisma.order.count({ where: { deletedAt: null } }),
      prisma.payment.aggregate({
        where: { status: "PAID" },
        _sum: { amount: true },
      }),
    ]);
    const totalRevenue = revenueAgg._sum.amount?.toNumber() ?? 0;
    return {
      success: true,
      data: { totalUsers, totalProducts, totalOrders, totalRevenue },
    };
  } catch (error) {
    console.error("fetchAdminMetricsAction error:", error);
    return {
      success: false,
      error: { code: "DB_ERROR", message: "Error fetching admin metrics" },
    };
  }
}
