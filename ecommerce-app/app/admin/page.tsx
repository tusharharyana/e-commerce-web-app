import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import { Product } from "@/models/Product";

export default async function AdminPage() {
  await connectDB();
  const products = await Product.find().lean();

  return (
    <div className="max-w-5xl mx-auto py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <Link
          href="/admin/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          + Add New Product
        </Link>
      </div>

      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Price</th>
            <th className="px-4 py-2 text-left">Stock</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p: any) => (
            <tr key={p._id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">{p.name}</td>
              <td className="px-4 py-2">₹{p.price}</td>
              <td className="px-4 py-2">{p.stock}</td>
              <td className="px-4 py-2 text-center space-x-2">
                <Link
                  href={`/admin/edit/${p._id}`}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </Link>
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
