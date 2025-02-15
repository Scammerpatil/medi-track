"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Doctor } from "@/types/doctor";

interface MedicalRecord {
  doctor: Doctor;
  diagnosis: string;
  prescriptions: string;
  treatment: string;
  date: Date;
}

const MedicalRecordsPage = () => {
  const [search, setSearch] = useState("");
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  useEffect(() => {
    const fetchMedicalRecords = async () => {
      const res = await axios.get("/api/patient/medical-records");
      setRecords(res.data.records);
    };
    fetchMedicalRecords();
  }, []);
  return (
    <>
      <h1 className="text-3xl font-semibold text-center text-base-content/90">
        Medical Records
      </h1>
      <p className="text-lg text-center text-base-content/60 my-2">
        View and manage your medical history.
      </p>

      <div className="flex justify-between items-center my-4">
        <input
          type="text"
          placeholder="Search by diagnosis..."
          className="input input-bordered w-full max-w-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto bg-base-300 p-4 rounded-lg shadow-md">
        <table className="table w-full">
          <thead>
            <tr className="text-base-content/60 text-base">
              <th>#</th>
              <th>Date</th>
              <th>Diagnosis</th>
              <th>Treatment</th>
              <th>Prescriptions</th>
              <th>Doctor</th>
            </tr>
          </thead>
          <tbody>
            {records.length > 0 ? (
              records.map((record, index) => (
                <tr key={index} className="text-base-content/80 text-base">
                  <td>{index + 1}</td>
                  <td className="py-2">
                    {new Date(record.date).toLocaleDateString()}
                  </td>
                  <td>{record.diagnosis}</td>
                  <td>{record.treatment}</td>
                  <td>{record.prescriptions}</td>
                  <td>{record.doctor.name}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="text-center text-base py-4 text-base-content/50"
                >
                  No medical records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MedicalRecordsPage;
