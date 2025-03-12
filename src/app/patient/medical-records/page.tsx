"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Doctor } from "@/types/doctor";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Link from "next/link";

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
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  useEffect(() => {
    const fetchMedicalRecords = async () => {
      const res = await axios.get("/api/patient/medical-records");
      setRecords(res.data.records);
    };
    fetchMedicalRecords();
  }, []);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Medical Records", 14, 10);
    autoTable(doc, {
      head: [["Date", "Diagnosis", "Treatment", "Prescriptions", "Doctor"]],
      body: records.map((record) => [
        new Date(record.date).toLocaleDateString(),
        record.diagnosis,
        record.treatment,
        record.prescriptions,
        record.doctor.name,
      ]),
    });
    doc.save("medical_records.pdf");
  };

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
        <button className="btn btn-primary ml-4" onClick={downloadPDF}>
          Download PDF
        </button>
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
            {currentRecords.length > 0 ? (
              currentRecords.map((record, index) => (
                <tr key={index} className="text-base-content/80 text-base">
                  <td>{indexOfFirstRecord + index + 1}</td>
                  <td className="py-2">
                    {new Date(record.date).toLocaleDateString()}
                  </td>
                  <td>{record.diagnosis}</td>
                  <td>{record.treatment}</td>
                  <td>
                    <Link
                      href={record.prescriptions}
                      className="link link-hover link-primary"
                    >
                      View Prescription
                    </Link>
                  </td>
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

      <div className="flex justify-center items-center mt-4">
        <button
          className="btn btn-sm mx-2"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-lg">Page {currentPage}</span>
        <button
          className="btn btn-sm mx-2"
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastRecord >= records.length}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default MedicalRecordsPage;
