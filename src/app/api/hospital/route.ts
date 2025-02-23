import dbConfig from "@/middlewares/db.config";
import Hospital from "@/models/Hospital.model";
import { NextResponse } from "next/server";
dbConfig();
export async function GET() {
  const hospitals = await Hospital.find({ isVerified: true });
  return NextResponse.json({ hospitals: hospitals }, { status: 200 });
}
