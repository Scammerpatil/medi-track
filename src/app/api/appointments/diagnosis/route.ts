import Patient from "@/models/Patient.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { formData, patient, doctor } = await req.json();
  if (!formData || !patient || !doctor) {
    return NextResponse.json({ message: "Bad Request" }, { status: 400 });
  }
  try {
    const existingPatient = await Patient.findOne({ _id: patient });
    if (!existingPatient) {
      return NextResponse.json(
        { message: "Patient not found" },
        { status: 404 }
      );
    }
    existingPatient.medicalHistory.push({
      doctor: doctor,
      diagnosis: formData.diagnosis,
      prescriptions: formData.prescriptions,
      treatment: formData.treatment,
    });
    await existingPatient.save();
    return NextResponse.json(
      { message: "Diagnosis submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error submitting diagnosis:", error);
    return NextResponse.json(
      { message: "Failed to submit diagnosis" },
      { status: 500 }
    );
  }
}
