import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

function createCsv(rows: string[][]) {
  return rows.map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")).join("\n");
}

export async function GET(req: NextRequest) {
  const user = await getCurrentUser(req);
  if (!user || user.role !== "BUSINESS") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const type = req.nextUrl.searchParams.get("type") || "orders";
  if (type === "stock") {
    const products = await prisma.product.findMany();
    const rows = [["Name", "Category", "Price", "Stock"], ...products.map((product) => [product.name, product.category, product.price.toFixed(2), product.stock.toString()])];
    const csv = createCsv(rows);
    const response = new NextResponse(csv);
    response.headers.set("Content-Type", "text/csv");
    response.headers.set("Content-Disposition", "attachment; filename=stock-report.csv");
    return response;
  }

  const orders = await prisma.order.findMany({ include: { client: true, orderItems: { include: { product: true } } } });
  const rows = [
    ["Order ID", "Client", "Status", "Total", "Created At", "Items"],
    ...orders.map((order) => [
      order.id,
      order.client.name,
      order.status,
      order.total.toFixed(2),
      order.createdAt.toISOString(),
      order.orderItems.map((item) => `${item.product.name} x${item.quantity}`).join("; "),
    ]),
  ];
  const csv = createCsv(rows);
  const response = new NextResponse(csv);
  response.headers.set("Content-Type", "text/csv");
  response.headers.set("Content-Disposition", "attachment; filename=orders-report.csv");
  return response;
}
