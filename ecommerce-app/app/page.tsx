import React from "react";
import ProductList from "./components/ProductList";

export const revalidate = 60; 
//Tells Next.js to rebuild the page every 60 seconds (ISR)

async function getProducts() {
  //Fetch data from our backend API
  //'force-cache' = use cached result (SSG)
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export default async function HomePage() {
  // This runs at build time (for SSG)
  const products = await getProducts();

  return (
    <main className="min-h-screen p-10 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Products</h1>
      <ProductList products={products} />
    </main>
  );
}
