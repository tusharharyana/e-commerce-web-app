import mongoose, { Schema, models, model } from "mongoose";

const ProductSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: String,
  price: Number,
  category: String,
  inventory: Number,
  imageUrl: String,
  lastUpdated: { type: Date, default: Date.now }
});

export const Product = models.Product || model("Product", ProductSchema);
