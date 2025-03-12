import Admin from "@/models/Admin.model";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  const isApproved = searchParams.get("isApproved");
  if (id && isApproved) {
    // approve admin
    await Admin.findByIdAndUpdate(id, { isApproved: isApproved });
    return NextResponse.json(
      { message: "Admin approved successfully" },
      { status: 200 }
    );
  }
  return NextResponse.json(
    { message: "Failed to approve admin" },
    { status: 400 }
  );
}
