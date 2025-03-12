"use client";
import { useUser } from "@/context/UserContext";
import axios from "axios";
import { useEffect, useState } from "react";
const OrganDonationRequest = () => {
  const { user } = useUser();
  const [organDonationRequests, setOrganDonationRequests] = useState([]);
  const fetchOrganDonationRequests = async () => {
    try {
      const response = await axios.get(`/api/donate-organs/get?id=${user?.id}`);
      setOrganDonationRequests(response.data.donations);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchOrganDonationRequests();
  }, []);
  return (
    <>
      <h1 className="text-3xl uppercase text-center font-semibold text-base-content/80 my-4">
        Organ Donation Requests
      </h1>
      <div className="overflow-x-auto bg-base-300 p-4 rounded-lg shadow-md">
        <table className="table w-full">
          <thead>
            <tr className="text-base-content/60 text-base">
              <th>#</th>
              <th>Patient Name</th>
              <th>Organ Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {organDonationRequests.length > 0 ? (
              organDonationRequests.map((organ: any, index) => (
                <tr key={organ._id} className="text-base-content/80 text-base">
                  <td>{index + 1}</td>
                  <td>{organ.patient.name}</td>
                  <td>
                    {organ.organ}{" "}
                    {`${organ.organ === "Blood" && organ.bloodType}`}
                  </td>
                  <td>
                    <select
                      className="select select-bordered"
                      value={organ.status}
                      onChange={(e) => {
                        axios.put("/api/donate-organs/update", {
                          id: organ._id,
                          status: e.target.value,
                        });
                        fetchOrganDonationRequests();
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
                  No Organ Donation found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrganDonationRequest;
