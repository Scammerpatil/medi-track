import dbConfig from "@/middlewares/db.config";
import OrganDonation from "@/models/OrganDonation.model";
import { NextRequest, NextResponse } from "next/server";

dbConfig();

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }
  try {
    const donation = await OrganDonation.find({ patient: id })
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
