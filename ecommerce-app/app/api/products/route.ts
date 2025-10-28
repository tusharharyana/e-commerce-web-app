import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Product } from "@/models/Product";
import { verifyAdmin } from "@/lib/auth";

export async function GET() {
  await connectDB();
  const products = await Product.find({});
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const admin = await verifyAdmin(req);
  if (!admin) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  await connectDB();
  const body = await req.json();

  const product = new Product({
    ...body,
    lastUpdated: new Date()
  });

  await product.save();
  return NextResponse.json({ message: "Product created successfully", product });
}
