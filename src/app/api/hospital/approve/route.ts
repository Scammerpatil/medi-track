import Hospital from "@/models/Hospital.model";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  const isApproved = searchParams.get("isVerified");
  console.log(id, isApproved);
  if (id && isApproved) {
    // approve admin
    await Hospital.findByIdAndUpdate(id, { isVerified: isApproved });
    return NextResponse.json(
      { message: "Hospital approved successfully" },
      { status: 200 }
    );
  }
  return NextResponse.json(
    { message: "Failed to approve Hospital" },
    { status: 400 }
  );
}
