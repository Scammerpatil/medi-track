import mongoose from "mongoose";

export interface User {
  _id?: mongoose.Schema.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  profilePic: string;
  isApproved: boolean;
}
