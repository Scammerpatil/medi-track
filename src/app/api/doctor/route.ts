import dbConfig from "@/middlewares/db.config";
import Doctor from "@/models/Doctor.model";
import { NextRequest, NextResponse } from "next/server";

dbConfig();

export async function GET(req: NextRequest) {
  try {
    const doctors = await Doctor.find({ isApproved: true });
    return NextResponse.json({ doctors });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return NextResponse.json(
      { message: "Error fetching doctors", error },
      { status: 500 }
    );
  }
}
