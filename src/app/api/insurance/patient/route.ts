import dbConfig from "@/middlewares/db.config";
import Insurance from "@/models/Insurance.model";
import { NextRequest, NextResponse } from "next/server";

dbConfig();

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
    const claims = await Insurance.find({ patient: id })
      .populate("doctor")
      .populate("hospital")
      .populate("patient");
    return NextResponse.json({ claims });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error fetching patient" },
      { status: 500 }
    );
  }
}
