import dbConfig from "@/middlewares/db.config";
import Hospital from "@/models/Hospital.model";
import { NextRequest, NextResponse } from "next/server";

dbConfig();

export async function POST(req: NextRequest) {
  const { newHospital, user } = await req.json();
  try {
    const hospital = await Hospital.create({
      ...newHospital,
      admin: user,
    });
    return NextResponse.json(
      { message: "Hospital added successfully", hospital },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to add hospital" },
      { status: 500 }
    );
  }
}
