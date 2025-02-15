"use client";
import { Hospital } from "@/types/hospital";
import { IconCheck, IconX } from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ApproveHospitalsPage = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);

  const fetchHospitals = async () => {
    try {
      const response = await axios.get("/api/hospital/getHospitalByAdmin");
      setHospitals(response.data.hospitals);
    } catch (error) {
      console.error("Error fetching hospitals:", error);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  const handleApprove = (id: string, isVerified: boolean) => async () => {
    const response = axios.put(
      `/api/hospital/approve?id=${id}&isVerified=${isVerified}`
    );
    toast.promise(response, {
      loading: "Processing...",
      success: () => {
        fetchHospitals();
        return isVerified
          ? "Hospital approved successfully"
          : "Hospital rejected successfully";
      },
      error: "An error occurred while updating the status",
    });
  };

  return (
    <>
      <h1 className="text-3xl font-semibold text-center text-base-content/90">
        Approve Hospitals
      </h1>
      <p className="text-lg text-center text-base-content/60 my-2">
        Manage hospital approvals and ensure only verified facilities operate.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {hospitals.length > 0 ? (
          hospitals.map((hospital: Hospital) => (
            <div
              className="card bg-base-300 shadow-md rounded-lg hover:shadow-lg"
              key={hospital._id}
            >
              <figure className="rounded-lg overflow-hidden">
                <img
                  src="https://media.istockphoto.com/id/1386596147/photo/doctors-or-nurses-walking-in-hospital-hallway-blurred-motion.jpg?s=2048x2048&w=is&k=20&c=2djFS1TrbVQwrY1Bp8o2AcEUDr1EWQ7iJM6u5GVK9cg="
                  alt="hospital"
                  className="w-full h-48 object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-xl font-medium text-base-content/90">
                  {hospital.name}
                </h2>
                <p className="text-base-content/70">
                  Address: {hospital.address}
                </p>
                <p className="text-base-content/70">
                  Contact: {hospital.contact}
                </p>

                <div className="divider" />

                <p className="text-base-content/80 font-medium">
                  Admin: {hospital.admin.name}
                </p>
                <p className="text-base-content/60">{hospital.admin.email}</p>

                <div className="mt-4 text-center">
                  {hospital.isVerified ? (
                    <span className="badge badge-success text-success-content badge-lg px-5 py-3">
                      <IconCheck className="text-success-content" /> Approved
                    </span>
                  ) : (
                    <span className="badge badge-error text-error-content badge-lg px-5 py-3">
                      <IconX className="text-error-content" /> Pending Approval
                    </span>
                  )}
                </div>

                <div className="divider" />
                <div className="card-actions w-full">
                  {!hospital.isVerified ? (
                    <button
                      className="btn btn-success w-full"
                      onClick={handleApprove(hospital._id, true)}
                    >
                      Approve
                    </button>
                  ) : (
                    <button
                      className="btn btn-error btn-outline w-full"
                      onClick={handleApprove(hospital._id, false)}
                    >
                      Reject
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center col-span-3 text-base-content/50 text-lg mt-10">
            No hospitals pending approval.
          </div>
        )}
      </div>
    </>
  );
};

export default ApproveHospitalsPage;
