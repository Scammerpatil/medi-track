import dbConfig from "@/middlewares/db.config";
import Doctor from "@/models/Doctor.model";
import { NextResponse } from "next/server";

dbConfig();

export async function GET() {
  const doctors = await Doctor.find().populate("hospital");
  return NextResponse.json({ doctors });
}
