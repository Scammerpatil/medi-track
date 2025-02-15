import Hospital from "@/models/Hospital.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const hospitals = await Hospital.find().populate("admin");
  return NextResponse.json({ hospitals: hospitals }, { status: 200 });
}
