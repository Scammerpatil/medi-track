import mongoose from "mongoose";

const OrganDonationSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },
    organ: {
      type: String,
      enum: [
        "Blood",
        "Heart",
        "Liver",
        "Kidney",
        "Lungs",
        "Pancreas",
        "Intestine",
        "Cornea",
      ],
      required: true,
    },
    bloodType: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const OrganDonation =
  mongoose.models.OrganDonation ||
  mongoose.model("OrganDonation", OrganDonationSchema);

export default OrganDonation;
