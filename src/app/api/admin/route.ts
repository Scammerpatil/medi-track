import dbConfig from "@/middlewares/db.config";
import Admin from "@/models/Admin.model";
import { NextResponse } from "next/server";

dbConfig();

export async function GET() {
  const admins = await Admin.find();
  return NextResponse.json({ admins });
}
