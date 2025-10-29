"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    slug: "",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!id) return;
    (async () => {
      const res = await fetch(`/api/products/${id}`);
      if (res.ok) {
        const data = await res.json();
        setForm({
          name: data.name,
          description: data.description,
          price: data.price,
          stock: data.stock,
          slug: data.slug,
        });
      } else {
        setMessage("Product not found");
      }
      setLoading(false);
    })();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      }),
    });

    if (res.ok) {
      setMessage("Product updated successfully!");
      router.push("/admin");
    } else {
      const data = await res.json();
      setMessage(`${data.message}`);
    }
  };

  if (loading) return <p className="text-center py-12">Loading product...</p>;

  return (
    <div className="max-w-xl mx-auto py-12">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full border px-4 py-2 rounded-md"
          required
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Product Description"
          className="w-full border px-4 py-2 rounded-md"
        />

        <input
          type="text"
          name="slug"
          value={form.slug}
          onChange={handleChange}
          placeholder="Slug (e.g. iphone-15-pro)"
          className="w-full border px-4 py-2 rounded-md"
          required
        />

        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full border px-4 py-2 rounded-md"
          required
        />

        <input
          type="number"
          name="stock"
          value={form.stock}
          onChange={handleChange}
          placeholder="Stock Quantity"
          className="w-full border px-4 py-2 rounded-md"
          required
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
        >
          Update Product
        </button>
      </form>

      {message && <p className="mt-4 text-sm">{message}</p>}
    </div>
  );
}
