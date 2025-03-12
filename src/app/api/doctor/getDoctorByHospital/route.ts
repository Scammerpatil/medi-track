import dbConfig from "@/middlewares/db.config";
import jwt from "jsonwebtoken";
import Doctor from "@/models/Doctor.model";
import { NextRequest, NextResponse } from "next/server";
import Hospital from "@/models/Hospital.model";

dbConfig();

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.redirect("/login");
  }
  const data = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
  try {
    const hospital = await Hospital.findOne({ admin: data.id }).populate(
      "doctors"
    );
    const doctors = hospital.doctors;
    return NextResponse.json({ doctors }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong!!!" },
      { status: 500 }
    );
  }
}
