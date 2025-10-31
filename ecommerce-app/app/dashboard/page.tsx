import { connectDB } from "@/lib/mongodb";
import { Product } from "@/models/Product";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic"; // ensures SSR always (no cache)

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const adminLoggedIn = cookieStore.get("adminLoggedIn")?.value === "true";

  if (!adminLoggedIn) {
    redirect("/admin/login");
  }

  await connectDB();

  const products = await Product.find().lean();
  const total = products.length;
  const lowStock = products.filter((p) => p.inventory < 5).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Inventory Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-lg font-semibold text-gray-700">Total Products</h2>
            <p className="text-2xl font-bold text-blue-600 mt-2">{total}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-lg font-semibold text-gray-700">Low Stock (&lt;5)</h2>
            <p className="text-2xl font-bold text-red-600 mt-2">{lowStock}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-lg font-semibold text-gray-700">In Stock</h2>
            <p className="text-2xl font-bold text-green-600 mt-2">{total - lowStock}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">All Products</h2>
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
              <tr>
                <th className="px-4 py-3 border">Name</th>
                <th className="px-4 py-3 border">Price ($)</th>
                <th className="px-4 py-3 border">Inventory</th>
                <th className="px-4 py-3 border">Category</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p: any) => (
                <tr key={p._id} className="text-center border-t hover:bg-gray-50">
                  <td className="px-4 py-2 border font-medium text-black">{p.name}</td>
                  <td className="px-4 py-2 border text-black">${p.price}</td>
                  <td
                    className={`px-4 py-2 border ${
                      p.inventory < 5 ? "text-red-600" : "text-black"
                    }`}
                  >
                    {p.inventory}
                  </td>
                  <td className="px-4 py-2 border text-black">{p.category || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
}
