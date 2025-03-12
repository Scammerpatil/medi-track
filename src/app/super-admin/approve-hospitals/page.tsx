"use client";
import { Hospital } from "@/types/hospital";
import axios from "axios";
import Image from "next/image";
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

      <div className="overflow-x-auto w-full px-10 mt-5">
        <table className="table bg-base-100 rounded-xl">
          <thead className="bg-base-200 text-base-content/80">
            <tr>
              <th>#</th>
              <th>Hospital</th>
              <th>Admin</th>
              <th>Contact Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {hospitals.length > 0 ? (
              hospitals.map((hospital: Hospital, index: number) => (
                <tr key={hospital._id} className="hover:bg-base-200">
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <Image
                            height={10}
                            width={10}
                            src="https://media.istockphoto.com/id/1386596147/photo/doctors-or-nurses-walking-in-hospital-hallway-blurred-motion.jpg?s=2048x2048&w=is&k=20&c=2djFS1TrbVQwrY1Bp8o2AcEUDr1EWQ7iJM6u5GVK9cg="
                            alt="Hospital Dummy Image"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{hospital.name}</div>
                        <div className="text-sm opacity-50">
                          {hospital.address}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{hospital.admin?.name}</td>
                  <td>{hospital.contact}</td>
                  <th>
                    <div className="">
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
                  </th>
                </tr>
              ))
            ) : (
              <tr className="text-center col-span-3 text-base-content/50 text-lg mt-10">
                <td colSpan={5}>No hospitals pending approval.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ApproveHospitalsPage;
