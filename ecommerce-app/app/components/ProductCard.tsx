import Link from "next/link";
import React from "react";

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    description: string;
    price: number;
    image?: string;
    slug: string;
  };
}

const ProductCard: React.FC<{ product: ProductCardProps["product"] }> = ({ product }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition duration-200 bg-white">
      {product.image ? (
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
      ) : (
        <div className="w-full h-48 bg-gray-100 rounded-md mb-4 flex items-center justify-center text-gray-400">
          No Image
        </div>
      )}

      <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
      <p className="text-gray-600 text-sm mt-1 line-clamp-2">{product.description}</p>

      <div className="mt-3">
        <span className="text-lg font-bold text-green-600">${product.price}</span>
      </div>  
    <Link
      href={`/products/${product.slug}`}
      className="mt-4 inline-block bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700 transition"
    >
      View Details
    </Link>
    </div>
  );
};

export default ProductCard;
