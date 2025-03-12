import dbConfig from "@/middlewares/db.config";
import Appointment from "@/models/Appointment.model";
import { NextRequest, NextResponse } from "next/server";

dbConfig();

export async function PUT(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  const status = searchParams.get("status");
  if (!id || !status) {
    return NextResponse.json({ message: "Bad Request" }, { status: 400 });
  }
  try {
    await Appointment.findByIdAndUpdate(id, { status });
    return NextResponse.json(
      { message: "Appointment updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating appointment:", error);
    return NextResponse.json(
      { message: "Failed to update appointment status" },
      { status: 500 }
    );
  }
}
