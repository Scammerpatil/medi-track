import { Doctor } from "./doctor";
import { User } from "./user";

export interface Hospital {
  _id: string;
  name: string;
  address: string;
  contact: string;
  coordinates: {
    type: string;
    coordinates: [0, 0];
  };
  admin: User;
  doctors: Doctor[];
  patients: User[];
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
