"use server";
import prisma from "@/lib/prisma";
import type { ActionResult } from "../types";

export type AdminStats = {
  productCount: number;
  orderCount: number;
  userCount: number;
  totalRevenue: number;
};

export async function fetchAdminStatsAction(): Promise<ActionResult<AdminStats>> {
  try {
    const [productCount, orderCount, userCount, revenueRaw] = await Promise.all([
      prisma.product.count({ where: { deletedAt: null } }),
      prisma.order.count({ where: { deletedAt: null } }),
      prisma.user.count({ where: { deletedAt: null } }),
      prisma.order.aggregate({
        _sum: { totalAmount: true },
        where: { deletedAt: null, status: "DELIVERED" }
      })
    ]);

    const totalRevenue = revenueRaw._sum.totalAmount?.toNumber() ?? 0;

    return {
      success: true,
      data: { productCount, orderCount, userCount, totalRevenue }
    };
  } catch (error) {
    console.error("fetchAdminStatsAction error:", error);
    return {
      success: false,
      error: { code: "DB_ERROR", message: "Error fetching admin stats" }
    };
  }
}
