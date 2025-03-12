import Patient from "@/models/Patient.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json(
      { message: "Please provide an id" },
      { status: 400 }
    );
  }
  try {
    const patient = await Patient.findById(id).populate(
      "medicalHistory.doctor"
    );
    return NextResponse.json({ patient }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong!!" },
      { status: 500 }
    );
  }
}
