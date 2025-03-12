import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Patient from "@/models/Patient.model";
export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.redirect("/login");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    if (decoded.role !== "patient") {
      return NextResponse.redirect("/login");
    }
    const patient = await Patient.findById(decoded.id).populate(
      "medicalHistory.doctor"
    );
    if (!patient) {
      return NextResponse.redirect("/login");
    }
    const records = patient.medicalHistory;
    return NextResponse.json({ records }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
