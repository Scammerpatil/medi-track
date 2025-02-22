import { Doctor } from "./doctor";
import { Hospital } from "./hospital";
import { Patient } from "./patient";

export interface Claim {
  _id: string;
  patient: Patient;
  treatment: string;
  insuranceNumber: string;
  hospital: Hospital;
  doctor: Doctor;
  status: string;
}
