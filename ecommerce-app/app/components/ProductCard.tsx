import Link from "next/link";
import React from "react";

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    description: string;
    price: number;
    imageUrl?: string;
    slug: string;
  };
}

const ProductCard: React.FC<{ product: ProductCardProps["product"] }> = ({ product }) => {
  return (
    <div className="card-hover border border-gray-200 rounded-xl p-6 shadow-sm bg-white overflow-hidden">
      {product.imageUrl ? (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg mb-4 transition-transform duration-300 hover:scale-105"
        />
      ) : (
        <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-400">
          <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
        </div>
      )}

      <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{product.name}</h2>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">{product.description}</p>

      <div className="flex items-center justify-between mb-4">
        <span className="text-2xl font-bold text-green-600">${product.price}</span>
      </div>

      <Link
        href={`/products/${product.slug}`}
        className="btn-primary w-full text-center block"
      >
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;
