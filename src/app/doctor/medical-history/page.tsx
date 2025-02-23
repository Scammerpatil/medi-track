"use client";
import { Patient } from "@/types/patient";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const MedicalHistroy = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [patient, setPatient] = useState<Patient>();
  useEffect(() => {
    const fetchPatient = async () => {
      const response = await axios.get(`/api/patient/get?id=${id}`);
      setPatient(response.data.patient);
    };
    fetchPatient();
  }, [id]);
  return (
    <>
      <h1 className="text-center uppercase font-semibold text-2xl">
        Medical Histroy of {patient?.name}
      </h1>
      <div className="overflow-x-auto bg-base-300 p-4 rounded-lg shadow-md mt-6">
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
            {patient?.medicalHistory?.length ?? 0 > 0 ? (
              patient?.medicalHistory.map((record, index) => (
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
                  colSpan={6}
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

export default MedicalHistroy;
