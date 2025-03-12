"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@/context/UserContext";
import { Hospital } from "@/types/hospital";
import toast from "react-hot-toast";

interface OrganDonation {
  _id: string;
  patient: { name: string };
  hospital: { name: string };
  organ: string;
  status: string;
  createdAt: Date;
}

const OrganDonationPage = () => {
  const { user } = useUser();
  const [donations, setDonations] = useState<OrganDonation[]>([]);
  const [hospitalId, setHospitalId] = useState("");
  const [hospital, setHospital] = useState<Hospital[]>([]);
  const [bloodType, setBloodType] = useState("");
  const [organ, setOrgan] = useState("");
  const fetchDonations = async () => {
    const res = await axios.get(`/api/donate-organs?id=${user?.id}`);
    setDonations(res.data.donations);
  };
  useEffect(() => {
    const fetchHospital = async () => {
      const res = await axios.get(`/api/hospital`);
      setHospital(res.data.hospitals);
    };
    fetchHospital();
    fetchDonations();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = axios.post("/api/donate-organs/addDonation", {
      patient: user?.id,
      hospital: hospitalId,
      organ,
      bloodType,
    });
    toast.promise(res, {
      loading: "Submitting organ donation request",
      success: () => {
        fetchDonations();
        return "Organ donation request submitted";
      },
      error: "Failed to submit organ donation request",
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold text-center uppercase">
        Organ Donation
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-base-300 p-10 rounded-lg shadow-md w-full max-w-lg mx-auto my-4"
      >
        <label className="block mb-2">Select Organ</label>
        <select
          value={organ}
          onChange={(e) => setOrgan(e.target.value)}
          className="select select-bordered w-full mb-3"
        >
          <option value="">Select an organ</option>
          <option value="Blood">Blood</option>
          <option value="Heart">Heart</option>
          <option value="Liver">Liver</option>
          <option value="Kidney">Kidney</option>
          <option value="Lungs">Lungs</option>
          <option value="Pancreas">Pancreas</option>
          <option value="Intestine">Intestine</option>
          <option value="Cornea">Cornea</option>
        </select>

        {organ === "Blood" && (
          <>
            <label className="block mb-2">Select Blood Type</label>
            <select
              value={bloodType}
              onChange={(e) => setBloodType(e.target.value)}
              className="select select-bordered w-full mb-3"
            >
              <option value="">Select an organ</option>
              {["A", "A+", "B", "B+", "AB", "AB+", "O+", "O-"].map(
                (key, index) => (
                  <option value={key} key={index}>
                    {key}
                  </option>
                )
              )}
            </select>
          </>
        )}

        <label className="block mb-2">Select Hospital</label>
        <select
          value={hospitalId}
          onChange={(e) => setHospitalId(e.target.value)}
          className="select select-bordered w-full mb-3"
        >
          <option value="">Select a hospital</option>
          {hospital.map((h) => (
            <option key={h._id} value={h._id}>
              {h.name}
            </option>
          ))}
        </select>

        <button type="submit" className="btn btn-primary w-full">
          Donate Organ
        </button>
      </form>

      <div className="overflow-x-auto bg-base-300 p-4 rounded-lg shadow-md">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Patient</th>
              <th>Hospital</th>
              <th>Organ</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {donations.length > 0 ? (
              donations.map((donation, index) => (
                <tr key={donation._id}>
                  <td>{index + 1}</td>
                  <td>{donation.patient.name}</td>
                  <td>{donation.hospital?.name}</td>
                  <td>{donation.organ}</td>
                  <td>{new Date(donation.createdAt).toLocaleDateString()}</td>
                  <td>{donation.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center">
                  No organ donations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrganDonationPage;
