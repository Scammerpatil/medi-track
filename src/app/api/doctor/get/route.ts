import dbConfig from "@/middlewares/db.config";
import Doctor from "@/models/Doctor.model";
import { NextRequest, NextResponse } from "next/server";

dbConfig();

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json(
      { message: "Please provide a valid id" },
      { status: 400 }
    );
  }
  try {
    const doctors = await Doctor.find({
      hospital: id,
      isApproved: true,
    }).populate("hospital");
    return NextResponse.json({ doctors });
  } catch (error) {
    console.log("Error fetching doctors:", error);
    return NextResponse.json(
      { message: "Error fetching doctors" },
      { status: 500 }
    );
  }
}
