import dbConfig from "@/middlewares/db.config";
import Doctor from "@/models/Doctor.model";
import { NextRequest, NextResponse } from "next/server";

dbConfig();
export async function PUT(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  const isApproved = searchParams.get("isApproved");
  if (id && isApproved) {
    // approve admin
    await Doctor.findByIdAndUpdate(id, { isApproved: isApproved });
    return NextResponse.json(
      { message: "Doctor approved successfully" },
      { status: 200 }
    );
  }
  return NextResponse.json(
    { message: "Failed to approve Doctor" },
    { status: 400 }
  );
}
