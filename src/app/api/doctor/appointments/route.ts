import Appointment from "@/models/Appointment.model";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.redirect("/login");
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET!) as any;
    const appointments = await Appointment.find({ doctor: data.id }).populate(
      "patient"
    );
    return NextResponse.json({ appointments }, { status: 200 });
  } catch (error) {
    console.log("Error fetching appointments:", error);
    return NextResponse.json(
      { message: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
}
