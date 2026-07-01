import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json({ products });
  } catch (error) {
    console.error("Failed to load products:", error);
    return NextResponse.json({ products: [] }, { status: 500 });
  }
}
