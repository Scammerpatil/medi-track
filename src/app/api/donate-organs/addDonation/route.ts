import OrganDonation from "@/models/OrganDonation.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { patient, hospital, organ, bloodType } = await req.json();
  if (!patient || !hospital || !organ) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }
  try {
    const donation = new OrganDonation({
      patient,
      hospital,
      organ,
      bloodType,
    });
    await donation.save();
    return NextResponse.json(
      { message: "Organ donation request submitted" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
