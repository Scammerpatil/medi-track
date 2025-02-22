"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Patient } from "@/types/patient";
import Link from "next/link";

const DoctorsPage = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("/api/patient");
        setPatients(response.data.patients);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching patients", error);
      }
    };
    fetchPatients();
  }, []);

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <h1 className="text-3xl font-semibold text-center text-base-content/90">
        Patients List
      </h1>
      <p className="text-lg text-center text-base-content/60 my-2">
        Search for a patient by name.
      </p>

      <div className="flex justify-center my-4">
        <input
          type="text"
          placeholder="Search by name..."
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
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>View Medical History</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient, index) => (
                <tr
                  key={patient._id}
                  className="text-base-content/80 text-base"
                >
                  <td>{index + 1}</td>
                  <td>{patient.name}</td>
                  <td>{patient.email}</td>
                  <td>{patient.phone}</td>
                  <td>
                    <Link
                      href={`/doctor/medical-history?id=${patient._id}`}
                      className="link link-primary no-underline"
                    >
                      View Medical history
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="text-center text-base py-4 text-base-content/50"
                >
                  No patients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DoctorsPage;
