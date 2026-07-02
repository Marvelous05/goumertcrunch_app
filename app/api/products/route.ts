import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

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

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);
    if (!user || !["business", "admin"].includes(user.role)) {
      return NextResponse.json({ error: "Business access required." }, { status: 403 });
    }

    const { name, description, price, stock, category } = await req.json();
    if (!name || !category || typeof price !== "number" || typeof stock !== "number") {
      return NextResponse.json({ error: "Please provide a valid product payload." }, { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        name,
        description: description || "",
        price,
        stock,
        category,
      },
    });

    return NextResponse.json({ product });
  } catch (error) {
    console.error("Failed to create product:", error);
    return NextResponse.json({ error: "Unable to create product." }, { status: 500 });
  }
}
