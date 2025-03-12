import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Admin from "@/models/Admin.model";
import Doctor from "@/models/Doctor.model";
import Patient from "@/models/Patient.model";
import dbConfig from "@/middlewares/db.config";

dbConfig();

export async function POST(req: NextRequest) {
  const { formData } = await req.json();
  console.log(formData);
  if (!formData.email || !formData.password) {
    return NextResponse.json("Please fill all the fields", { status: 400 });
  }
  if (
    formData.role === "superAdmin" &&
    formData.email === process.env.SUPER_ADMIN_EMAIL &&
    formData.password === process.env.SUPER_ADMIN_PASSWORD
  ) {
    const data = {
      role: "super-admin",
      email: process.env.SUPER_ADMIN_EMAIL,
      name: "Super Admin",
      isApproved: true,
      profilePic:
        "https://static.vecteezy.com/system/resources/previews/043/900/708/non_2x/user-profile-icon-illustration-vector.jpg",
    };
    const token = jwt.sign(data, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });
    const response = NextResponse.json({
      message: "Welcome Super Admin",
      route: "/super-admin/dashboard",
      token,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 1000,
      sameSite: "lax",
    });
    return response;
  } else if (formData.role === "admin") {
    const admin = await Admin.findOne({ email: formData.email });
    if (!admin) {
      return NextResponse.json({ message: "No User Found" }, { status: 400 });
    }
    const data = {
      id: admin._id,
      role: "admin",
      email: admin.email,
      name: admin.name,
      isApproved: admin.isApproved,
      profilePic:
        "https://static.vecteezy.com/system/resources/previews/043/900/708/non_2x/user-profile-icon-illustration-vector.jpg",
    };
    const token = jwt.sign(data, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });
    const response = NextResponse.json({
      message: `Welcome ${admin.name}`,
      route: "/admin/dashboard",
      token,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 1000,
      sameSite: "lax",
    });
    return response;
  } else if (formData.role === "doctor") {
    const doctor = await Doctor.findOne({ email: formData.email });
    if (!doctor) {
      return NextResponse.json({ message: "No User Found" }, { status: 400 });
    }
    const data = {
      id: doctor._id,
      role: "doctor",
      email: doctor.email,
      name: doctor.name,
      isApproved: doctor.isApproved,
      profilePic:
        "https://static.vecteezy.com/system/resources/previews/043/900/708/non_2x/user-profile-icon-illustration-vector.jpg",
    };
    const token = jwt.sign(data, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });
    const response = NextResponse.json({
      message: `Welcome ${doctor.name}`,
      route: "/doctor/dashboard",
      token,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 1000,
      sameSite: "lax",
    });
    return response;
  } else if (formData.role === "patient") {
    const patient = await Patient.findOne({ email: formData.email });
    if (!patient) {
      return NextResponse.json({ message: "No User Found" }, { status: 400 });
    }
    const data = {
      id: patient._id,
      role: "patient",
      email: patient.email,
      name: patient.name,
      isApproved: true,
      profilePic:
        "https://static.vecteezy.com/system/resources/previews/043/900/708/non_2x/user-profile-icon-illustration-vector.jpg",
    };
    const token = jwt.sign(data, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });
    const response = NextResponse.json({
      message: `Welcome ${patient.name}`,
      route: "/patient/dashboard",
      token,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 1000,
      sameSite: "lax",
    });
    return response;
  }
  return NextResponse.json("Invalid Role", { status: 400 });
}
