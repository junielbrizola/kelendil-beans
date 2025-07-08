// src/actions/admin/fetchDashboardStats.ts
"use server";
import prisma from "@/lib/prisma";

export type DashboardStats = {
  totalOrders: number;
  totalRevenue: number;
  ordersByStatus: Array<{ status: string; count: number }>;
  revenueByDay: Array<{ date: string; revenue: number }>;
  recentOrders: Array<{
    id: string;
    userId: string;
    status: string;
    totalAmount: number;
    createdAt: string;
  }>;
};

export async function fetchDashboardStats(): Promise<DashboardStats> {
  // total de pedidos
  const totalOrders = await prisma.order.count();

  // soma de receita
  const agg = await prisma.order.aggregate({ _sum: { totalAmount: true } });
  const totalRevenue = Number(agg._sum.totalAmount?.toString() || 0);

  // pedidos por status
  const statuses = await prisma.order.groupBy({
    by: ["status"],
    _count: { status: true }
  });
  const ordersByStatus = statuses.map(s => ({
    status: s.status,
    count: s._count.status
  }));

  // receita dos últimos 7 dias
  const since = new Date();
  since.setDate(since.getDate() - 6);
  const last7 = await prisma.order.findMany({
    where: { createdAt: { gte: since } },
    select: { totalAmount: true, createdAt: true }
  });
  // agrupa por dia
  const map: Record<string, number> = {};
  for (let i = 0; i < 7; i++) {
    const d = new Date(since);
    d.setDate(since.getDate() + i);
    map[d.toISOString().slice(0,10)] = 0;
  }
  last7.forEach(o => {
    const day = o.createdAt.toISOString().slice(0,10);
    map[day] = (map[day] || 0) + Number(o.totalAmount.toString());
  });
  const revenueByDay = Object.entries(map).map(([date, revenue]) => ({ date, revenue }));

  // últimos 5 pedidos
  const recent = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    take: 5
  });
  const recentOrders = recent.map(o => ({
    id: o.id,
    userId: o.userId,
    status: o.status,
    totalAmount: Number(o.totalAmount.toString()),
    createdAt: o.createdAt.toISOString()
  }));

  return { totalOrders, totalRevenue, ordersByStatus, revenueByDay, recentOrders };
}
