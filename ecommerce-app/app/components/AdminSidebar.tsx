"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminSidebar() {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "adminLoggedIn=; path=/; max-age=0";
    router.push("/admin/login");
  };

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
      </div>

      <nav className="space-y-2">
        <Link
          href="/admin"
          className="block py-2 px-4 rounded hover:bg-gray-700 transition"
        >
          Products
        </Link>
        <Link
          href="/dashboard"
          className="block py-2 px-4 rounded hover:bg-gray-700 transition"
        >
          Dashboard
        </Link>
        <Link
          href="/admin/new"
          className="block py-2 px-4 rounded hover:bg-gray-700 transition"
        >
          Add Product
        </Link>
        <button
          onClick={handleLogout}
          className="block w-full text-left py-2 px-4 rounded hover:bg-gray-700 transition"
        >
          Logout
        </button>
      </nav>
    </div>
  );
}
