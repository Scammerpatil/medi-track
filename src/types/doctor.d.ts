import { Hospital } from "./hospital";

export interface Doctor {
  _id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  hospital: Hospital;
  specialization: string;
  experience: number;
  availability: { day: string; startTime: string; endTime: string }[];
  isApproved: boolean;
  createdAt: string;
}
