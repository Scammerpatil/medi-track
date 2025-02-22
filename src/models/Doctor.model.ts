import mongoose from "mongoose";
import { Schema } from "mongoose";

const DoctorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    availability: {
      type: [{ day: String, startTime: String, endTime: String }],
      default: [],
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    ratings: [
      {
        type: Number,
      },
    ],
    feedbacks: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const Doctor = mongoose.models.Doctor || mongoose.model("Doctor", DoctorSchema);
export default Doctor;
