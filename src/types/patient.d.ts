import { Doctor } from "./doctor";

export interface Patient {
  name: string;
  phone: string;
  email: string;
  password: string;
  medicalHistory: [
    {
      doctor: Doctor;
      diagnosis: string;
      prescriptions: string;
      treatment: string;
      date: Date;
    }
  ];
  sharedWith: Doctor[];
  appointments: string[];
}
