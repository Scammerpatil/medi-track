import bcrypt from "bcryptjs";
import Admin from "@/models/Admin.model";
import { NextRequest, NextResponse } from "next/server";
import dbConfig from "@/middlewares/db.config";
import Doctor from "@/models/Doctor.model";
import Hospital from "@/models/Hospital.model";
import Patient from "@/models/Patient.model";

dbConfig();

export async function POST(req: NextRequest) {
  const { formData } = await req.json();
  if (
    !formData.name ||
    !formData.email ||
    !formData.phone ||
    !formData.password
  ) {
    return NextResponse.json(
      { message: "Please fill all the fields" },
      { status: 400 }
    );
  }
  if (formData.role === "admin") {
    // find exisiting admin
    const existingAdmin = await Admin.findOne({ email: formData.email });
    if (existingAdmin) {
      return NextResponse.json(
        { message: "Email already taken" },
        { status: 400 }
      );
    }
    const encryptedPassword = bcrypt.hashSync(formData.password);
    delete formData.hospital;
    const newAdmin = new Admin({
      ...formData,
      password: encryptedPassword,
    });
    newAdmin.save();
    return NextResponse.json(
      { message: "Account created successfully" },
      { status: 200 }
    );
  }
  if (formData.role === "doctor") {
    // find exisiting doctor
    const existingDoctor = await Doctor.findOne({ email: formData.email });
    if (existingDoctor) {
      return NextResponse.json(
        { message: "Email already taken" },
        { status: 400 }
      );
    }
    const hospital = await Hospital.findById(formData.hospital);
    const encryptedPassword = bcrypt.hashSync(formData.password);
    const newDoctor = new Doctor({
      ...formData,
      password: encryptedPassword,
    });
    newDoctor.save();
    hospital.doctors.push(newDoctor._id);
    hospital.save();
    return NextResponse.json(
      { message: "Account created successfully" },
      { status: 200 }
    );
  }
  if (formData.role === "patient") {
    // find exisiting patient
    const existingPatient = await Patient.findOne({ email: formData.email });
    if (existingPatient) {
      return NextResponse.json(
        { message: "Email already taken" },
        { status: 400 }
      );
    }
    const encryptedPassword = bcrypt.hashSync(formData.password);
    delete formData.hospital;
    const newPatient = new Patient({
      ...formData,
      password: encryptedPassword,
    });
    newPatient.save();
    return NextResponse.json(
      { message: "Account created successfully" },
      { status: 200 }
    );
  }
  return NextResponse.json({ message: "Invalid role" }, { status: 400 });
}
