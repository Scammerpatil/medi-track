import Hospital from "@/models/Hospital.model";
import { NextResponse } from "next/server";

export async function GET() {
  const hospitals = await Hospital.find().populate("admin");
  return NextResponse.json({ hospitals: hospitals }, { status: 200 });
}
