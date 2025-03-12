import dbConfig from "@/middlewares/db.config";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

dbConfig();

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "No token found" });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET!);
    if (!data) {
      return NextResponse.json({ error: "Invalid token" });
    }
    return NextResponse.json({ data, status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err }, { status: 401 });
  }
}
