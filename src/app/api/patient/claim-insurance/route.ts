import dbConfig from "@/middlewares/db.config";
import Insurance from "@/models/Insurance.model";
import { NextRequest, NextResponse } from "next/server";

dbConfig();

export async function POST(req: NextRequest) {
  const { patient, insuranceNumber, treatment, doctor, hospital } =
    await req.json();
  if (!patient || !insuranceNumber || !treatment || !doctor || !hospital) {
    return NextResponse.json(
      { message: "Please fill all fields" },
      { status: 400 }
    );
  }
  try {
    const newClaim = new Insurance({
      patient,
      insuranceNumber,
      treatment,
      doctor,
      hospital,
    });
    await newClaim.save();
    return NextResponse.json({ message: "Claim submitted successfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error submitting claim. Please try again" },
      { status: 500 }
    );
  }
}
