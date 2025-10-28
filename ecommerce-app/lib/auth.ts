import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

export function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
}

export async function verifyAdmin(req: NextRequest) {
  const user = await verifyToken(req);
  if (user && user.role === "admin") {
    return user;
  }
  return null;
}

