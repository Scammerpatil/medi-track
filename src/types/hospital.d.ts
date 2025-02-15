import { User } from "./user";

export interface Hospital {
  _id: string;
  name: string;
  address: string;
  contact: string;
  admin: User;
  doctors: User[];
  patients: User[];
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
