import dbConfig from "@/middlewares/db.config";
import Insurance from "@/models/Insurance.model";
import { NextRequest, NextResponse } from "next/server";

dbConfig();

export async function PUT(req: NextRequest) {
  const { id, status } = await req.json();
  if (!id || !status) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }
  try {
    await Insurance.findByIdAndUpdate(id, { status });
    return NextResponse.json({ message: "Claim updated" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
