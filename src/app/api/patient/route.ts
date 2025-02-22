import Patient from "@/models/Patient.model";
import { NextResponse } from "next/server";

export async function GET() {
  const patients = await Patient.find();
  return NextResponse.json({
    message: "Patients fetched successfully",
    patients,
  });
}
