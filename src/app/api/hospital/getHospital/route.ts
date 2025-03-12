import Hospital from "@/models/Hospital.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  if (id) {
    const hospital = await Hospital.findOne({ admin: id }).populate("doctors");
    return NextResponse.json({ hospital }, { status: 200 });
  }
  return NextResponse.json({ message: "Hospital not found" }, { status: 404 });
}
