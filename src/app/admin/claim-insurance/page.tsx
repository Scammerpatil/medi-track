"use client";
import { useUser } from "@/context/UserContext";
import { Claim } from "@/types/Claim";
import axios from "axios";
import { useEffect, useState } from "react";
const ClaimRequest = () => {
  const { user } = useUser();
  const [claimRequest, setClaimRequest] = useState<Claim[]>([]);
  const fetchClaims = async () => {
    const res = await axios.get("/api/insurance/hospital?id=" + user?.id);
    setClaimRequest(res.data.claims);
  };
  useEffect(() => {
    fetchClaims();
  }, []);
  return (
    <>
      <h1 className="text-3xl uppercase text-center font-semibold text-base-content/80 my-4">
        Claim History
      </h1>
      <div className="overflow-x-auto bg-base-300 p-4 rounded-lg shadow-md">
        <table className="table w-full">
          <thead>
            <tr className="text-base-content/60 text-base">
              <th>#</th>
              <th>Patient Name</th>
              <th>Insurance Number</th>
              <th>Treatment</th>
              <th>Doctor</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {claimRequest.length > 0 ? (
              claimRequest.map((claim: Claim, index) => (
                <tr key={claim._id} className="text-base-content/80 text-base">
                  <td>{index + 1}</td>
                  <td>{claim.patient.name}</td>
                  <td>{claim.treatment}</td>
                  <td>{claim.insuranceNumber}</td>
                  <td>{claim.doctor.name}</td>
                  <td>
                    <select
                      className="select select-bordered"
                      value={claim.status}
                      onChange={(e) => {
                        axios.put("/api/insurance/update", {
                          id: claim._id,
                          status: e.target.value,
                        });
                        fetchClaims();
                      }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
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
export default ClaimRequest;
