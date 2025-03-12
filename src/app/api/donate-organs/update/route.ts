import OrganDonation from "@/models/OrganDonation.model";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const { id, status } = await req.json();
  if (!id || !status) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }
  try {
    const donation = await OrganDonation.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    )
      .populate("hospital")
      .populate("patient");
    return NextResponse.json({ donations: donation }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
