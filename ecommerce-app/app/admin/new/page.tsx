"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    slug: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      }),
    });

    if (res.ok) {
      setMessage("Product created successfully!");
      setForm({ name: "", description: "", price: "", stock: "", slug: "" });
      router.push("/admin");
    } else {
      const data = await res.json();
      setMessage(`Error: ${data.message || "Failed to create product"}`);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto py-12">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>

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
          placeholder="Product Slug (e.g. iphone-15-pro)"
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
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>

      {message && <p className="mt-4 text-sm">{message}</p>}
    </div>
  );
}
