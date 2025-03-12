import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Appointment from "@/models/Appointment.model";
export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.redirect("/login");
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET!) as any;
    const appointments = await Appointment.find({ patient: data.id }).populate(
      "doctor"
    );
    return NextResponse.json({ appointments });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error fetching appointments" },
      { status: 500 }
    );
  }
}
