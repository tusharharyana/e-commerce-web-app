import { connectDB } from "@/lib/mongodb";
import { Product } from "@/models/Product";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await connectDB();

  const product = await Product.findOne({ slug }).lean();

  if (!product) {
    notFound();
  }

  return (
    <div className="flex justify-center py-12 px-4">
      <div className="bg-white rounded-xl shadow-md border max-w-xl w-full p-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0 flex justify-center items-center md:w-1/3 mb-4 md:mb-0">
            <img
              src={product.imageUrl || "/placeholder.png"}
              alt={product.name}
              className="h-48 w-48 object-cover rounded-lg border"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-3 text-gray-900">{product.name}</h1>
            <p className="text-base text-gray-700 mb-4">{product.description}</p>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xl font-semibold text-green-600">
                ₹{product.price}
              </p>
              <span
                className={`px-3 py-1 rounded-full text-xs ${
                  product.stock > 0
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>
            <p className="text-sm text-gray-500">
              {product.stock} items left
            </p>
            <button
              disabled={product.stock <= 0}
              className={`mt-6 w-full py-2 rounded-lg font-semibold transition-colors 
                          ${product.stock > 0
                            ? "bg-indigo-600 text-white hover:bg-indigo-700"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                          }`}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
