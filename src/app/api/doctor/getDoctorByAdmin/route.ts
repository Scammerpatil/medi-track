import dbConfig from "@/middlewares/db.config";
import Doctor from "@/models/Doctor.model";
import { NextRequest, NextResponse } from "next/server";

dbConfig();

export async function GET(req: NextRequest) {
  const doctors = await Doctor.find().populate("hospital");
  return NextResponse.json({ doctors });
}
