"use client";
import { Doctor } from "@/types/doctor";
import { IconCheck, IconX } from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ApproveDoctorPage = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("/api/doctor/getDoctorByAdmin");
      setDoctors(response.data.doctors);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };
  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleApprove = (id: string, isApproved: boolean) => async () => {
    const response = axios.put(
      `/api/doctor/approve?id=${id}&isApproved=${isApproved}`
    );
    toast.promise(response, {
      loading: "Processing...",
      success: () => {
        fetchDoctors();
        return isApproved
          ? "Doctor approved successfully"
          : "Doctor rejected successfully";
      },
      error: "An error occurred while updating the status",
    });
  };

  return (
    <>
      <h1 className="text-3xl font-semibold text-center text-base-900">
        Approve Doctors
      </h1>
      <p className="text-lg text-center text-base-content/60 my-2">
        Manage and verify doctor profiles before approval.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {doctors.length > 0 ? (
          doctors.map((doctor: Doctor) => (
            <div
              className="card bg-base-300 shadow-md rounded-lg hover:shadow-lg transition-all"
              key={doctor._id}
            >
              <figure className="rounded-lg overflow-hidden">
                <img
                  src="https://xsgames.co/randomusers/avatar.php?g=male"
                  alt="doctor"
                  className="w-full h-48 object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-xl font-medium text-base-content/90">
                  {doctor.name}
                </h2>
                <p className="text-base-content/70">Phone: {doctor.phone}</p>
                <p className="text-base-content/70">
                  Specialization: {doctor.specialization}
                </p>
                <p className="text-base-content/70">
                  Experience: {doctor.experience} years
                </p>

                <div className="divider" />

                <p className="text-base-content/80 font-medium">
                  Hospital: {doctor.hospital.name}
                </p>
                <p className="text-base-content/60">
                  {doctor.hospital.contact}
                </p>

                <div className="mt-4 text-center">
                  {doctor.isApproved ? (
                    <span className="badge badge-success badge-lg p-4 space-x-3">
                      <IconCheck className="text-success-content" /> Approved
                    </span>
                  ) : (
                    <span className="badge badge-error badge-lg p-4 space-x-3">
                      <IconX className="text-error-content" /> Pending Approval
                    </span>
                  )}
                </div>

                <div className="divider" />
                <div className="card-actions flex justify-between">
                  {!doctor.isApproved ? (
                    <button
                      className="btn btn-success btn-outline w-full"
                      onClick={handleApprove(doctor._id, true)}
                    >
                      Approve
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline btn-error w-full"
                      onClick={handleApprove(doctor._id, false)}
                    >
                      Reject
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center col-span-3 text-base-content/60 text-lg mt-10">
            No doctors pending approval.
          </div>
        )}
      </div>
    </>
  );
};

export default ApproveDoctorPage;
