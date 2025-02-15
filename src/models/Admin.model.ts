import mongoose, { Schema } from "mongoose";

const AdminSchema = new Schema({
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
  },
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
  },
  role: {
    type: String,
    required: true,
    default: "admin",
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: true,
  },
});

const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
export default Admin;
