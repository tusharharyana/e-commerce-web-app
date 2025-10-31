import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              ShopSmart
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-blue-600 transition">
              Products
            </Link>
            <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 transition">
              Dashboard
            </Link>
            <Link href="/recommendations" className="text-gray-700 hover:text-blue-600 transition">
              Recommendations
            </Link>
            <Link href="/admin/login" className="text-gray-700 hover:text-blue-600 transition">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
