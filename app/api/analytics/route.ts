import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const user = await getCurrentUser(req);
  if (!user || user.role !== "BUSINESS") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const orders = await prisma.order.findMany();
  const expenses = await prisma.expense.findMany();
  const products = await prisma.product.findMany();

  const revenue = orders.reduce((sum, order) => sum + order.total, 0);
  const expenseTotal = expenses.reduce((sum, item) => sum + item.amount, 0);
  const stockValue = products.reduce((sum, product) => sum + product.price * product.stock, 0);

  return NextResponse.json({ analytics: { revenue, orders: orders.length, stockValue, expenses: expenseTotal, profit: revenue - expenseTotal } });
}
