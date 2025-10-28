import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Product } from "@/models/Product";

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await context.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching product", error }, { status: 500 });
  }
}

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await context.params;
  try {
    const body = await req.json();
    const updated = await Product.findByIdAndUpdate(id, body, { new: true });
    if (!updated) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ message: "Error updating product", error }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await context.params;
  try {
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting product", error }, { status: 500 });
  }
}
