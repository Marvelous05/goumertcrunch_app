import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const user = await getCurrentUser(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (user.role === "BUSINESS") {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        client: true,
        orderItems: { include: { product: true } },
      },
    });
    return NextResponse.json({ orders });
  }

  const orders = await prisma.order.findMany({
    where: { clientId: user.id },
    orderBy: { createdAt: "desc" },
    include: {
      orderItems: { include: { product: true } },
    },
  });

  return NextResponse.json({ orders });
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser(req);
  if (!user || user.role !== "CLIENT") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { items } = await req.json();
  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "At least one item is required." }, { status: 400 });
  }

  const productIds = items.map((item: any) => item.productId);
  const products = await prisma.product.findMany({ where: { id: { in: productIds } } });

  const orderItems = products.map((product) => {
    const item = items.find((item: any) => item.productId === product.id);
    const quantity = Math.max(1, Number(item?.quantity ?? 0));
    return {
      productId: product.id,
      quantity,
      price: product.price,
    };
  });

  const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const order = await prisma.order.create({
    data: {
      clientId: user.id,
      total,
      orderItems: {
        create: orderItems,
      },
    },
    include: {
      orderItems: true,
    },
  });

  await Promise.all(
    orderItems.map((item) =>
      prisma.product.update({ where: { id: item.productId }, data: { stock: { decrement: item.quantity } } })
    )
  );

  return NextResponse.json({ order });
}
