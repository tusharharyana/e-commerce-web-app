import { connectDB } from "@/lib/mongodb";
import { Product } from "@/models/Product";
import { notFound } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

interface ProductType {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  inventory: number;
  imageUrl?: string;
  slug: string;
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await connectDB();

  const product = await Product.findOne({ slug }).lean() as ProductType | null;

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-8 flex items-center justify-center bg-gray-50">
              <div className="relative">
                <img
                  src={product.imageUrl || "/placeholder.png"}
                  alt={product.name}
                  className="w-full max-w-md h-96 object-cover rounded-xl shadow-md"
                />
                {!product.imageUrl && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-xl">
                    <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            <div className="md:w-1/2 p-8">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
                <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl font-bold text-green-600">${product.price}</span>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      product.inventory > 0
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.inventory > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
                <p className="text-gray-500">
                  {product.inventory} items available
                </p>
              </div>

              <div className="space-y-4">
                <button
                  disabled={product.inventory <= 0}
                  className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
                    product.inventory > 0
                      ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {product.inventory > 0 ? "Add to Cart" : "Out of Stock"}
                </button>

                <button className="w-full py-3 rounded-xl font-medium text-blue-600 border-2 border-blue-600 hover:bg-blue-50 transition-colors">
                  Add to Wishlist
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-900">Category:</span>
                    <p className="text-gray-600">{product.category || "General"}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">SKU:</span>
                    <p className="text-gray-600">{product.slug}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
