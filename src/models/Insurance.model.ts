import mongoose from "mongoose";

const InsuranceClaimSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
    required: true,
  },
  insuranceNumber: {
    type: String,
    required: true,
  },
  treatment: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  date: { type: Date, default: Date.now },
});

const Insurance =
  mongoose.models.InsuranceClaim ||
  mongoose.model("InsuranceClaim", InsuranceClaimSchema);

export default Insurance;
