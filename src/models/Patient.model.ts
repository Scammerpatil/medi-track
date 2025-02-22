import mongoose, { Schema } from "mongoose";

const PatientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    medicalHistory: [
      {
        doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
        diagnosis: String,
        prescriptions: String,
        treatment: String,
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const Patient =
  mongoose.models.Patient || mongoose.model("Patient", PatientSchema);

export default Patient;
