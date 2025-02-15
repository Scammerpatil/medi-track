import dbConfig from "@/middlewares/db.config";
import Hospital from "@/models/Hospital.model";
import { NextRequest, NextResponse } from "next/server";
dbConfig();
export async function GET(req: NextRequest) {
  const hospitals = await Hospital.find({ isVerified: true });
  return NextResponse.json({ hospitals: hospitals }, { status: 200 });
}
