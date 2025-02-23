// Claim Insurance Page
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Patient } from "@/types/patient";
import { useUser } from "@/context/UserContext";
import toast from "react-hot-toast";
import { Claim } from "@/types/Claim";
const ClaimInsurance = () => {
  const { user } = useUser();
  const [claims, setClaims] = useState([]);
  const [userData, setUserData] = useState<Patient>();
  const [insuranceNumber, setInsuranceNumber] = useState("");
  const [selectedTreatment, setSelectedTreatment] = useState("");

  const fetchClaims = async () => {
    const res = await axios.get("/api/insurance/patient?id=" + user?.id);
    setClaims(res.data.claims);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/patient/get?id=${user?.id}`);
      setUserData(res.data.patient);
    };
    fetchClaims();
    fetchUser();
  }, [user?.id]);

  const handleClaim = async (e: any) => {
    e.preventDefault();
    const res = axios.post("/api/patient/claim-insurance", {
      patient: user?.id,
      insuranceNumber,
      treatment: selectedTreatment,
      doctor: userData?.medicalHistory.find(
        (record) => record.treatment === selectedTreatment
      )?.doctor._id,
      hospital: userData?.medicalHistory.find(
        (record) => record.treatment === selectedTreatment
      )?.doctor.hospital,
    });
    toast.promise(res, {
      loading: "Submitting claim...",
      success: () => {
        fetchClaims();
        return "Claim submitted successfully";
      },
      error: "Error submitting claim. Please try again",
    });
  };

  return (
    <>
      <h1 className="text-3xl font-semibold uppercase text-center text-base-content/90">
        Claim Insurance
      </h1>
      <form
        onSubmit={handleClaim}
        className="bg-base-300 p-10 rounded-lg shadow-md mt-6"
      >
        <label className="block text-base-content/70">Insurance Number:</label>
        <input
          type="text"
          className="input input-bordered w-full my-2"
          value={insuranceNumber}
          onChange={(e) => setInsuranceNumber(e.target.value)}
          required
        />

        <label className="block text-base-content/70">Select Treatment:</label>
        <select
          className="select select-bordered w-full my-2"
          value={selectedTreatment}
          onChange={(e) => setSelectedTreatment(e.target.value)}
          required
        >
          <option value="">Select a treatment</option>
          {userData?.medicalHistory?.map((record, index) => (
            <option key={index} value={record.treatment}>
              {record.treatment}
            </option>
          ))}
        </select>

        <button type="submit" className="btn btn-primary w-full mt-5">
          Submit Claim
        </button>
      </form>

      <h2 className="text-2xl font-semibold text-base-content/80 my-4">
        Claim History
      </h2>
      <div className="overflow-x-auto bg-base-300 p-4 rounded-lg shadow-md">
        <table className="table w-full">
          <thead>
            <tr className="text-base-content/60 text-base">
              <th>#</th>
              <th>Treatment</th>
              <th>Insurance Number</th>
              <th>Hospital</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {claims.length > 0 ? (
              claims.map((claim: Claim, index) => (
                <tr key={claim._id} className="text-base-content/80 text-base">
                  <td>{index + 1}</td>
                  <td>{claim.treatment}</td>
                  <td>{claim.insuranceNumber}</td>
                  <td>{claim.hospital.name}</td>
                  <td>{claim.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="text-center text-base py-4 text-base-content/50"
                >
                  No claims found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ClaimInsurance;
