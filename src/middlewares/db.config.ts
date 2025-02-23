import Admin from "@/models/Admin.model";
import Doctor from "@/models/Doctor.model";
import Hospital from "@/models/Hospital.model";
import Insurance from "@/models/Insurance.model";
import Patient from "@/models/Patient.model";
import mongoose from "mongoose";

// Database Connection

const dbConfig = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Connected to the Database");
    });
    Admin;
    Hospital;
    Doctor;
    Insurance;
    Patient;
    connection.on("error", (error) => {
      console.log("Error: ", error);
    });
  } catch (error) {
    console.log("Error: ", error);
  }
};

export default dbConfig;
