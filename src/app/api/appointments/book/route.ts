import { NextRequest, NextResponse } from "next/server";
import Appointment from "@/models/Appointment.model";

export async function POST(req: NextRequest) {
  try {
    const { formData, patient } = await req.json();
    console.log("formData:", formData);
    // Book appointment here
    const newAppointment = new Appointment({
      doctor: formData.doctorId,
      patient: patient,
      date: formData.date,
      time: formData.time,
      reason: formData.reason,
    });
    await newAppointment.save();
    return NextResponse.json({ message: "Appointment booked successfully!" });
  } catch (error) {
    console.log("Error booking appointment:", error);
    return NextResponse.json(
      { message: "Failed to book appointment." },
      { status: 500 }
    );
  }
}
