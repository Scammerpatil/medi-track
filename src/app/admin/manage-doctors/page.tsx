"use client";
import { Doctor } from "@/types/doctor";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ApproveDoctorPage = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("/api/doctor/getDoctorByHospital");
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

      <div className="overflow-x-auto w-full px-10 mt-5">
        <table className="table table-zebra bg-base-100 rounded-xl">
          <thead className="">
            <tr className="">
              <th>#</th>
              <th>Doctor</th>
              <th>Hospital</th>
              <th>Contact Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {doctors.length > 0 ? (
              doctors.map((doctor: Doctor, index: number) => (
                <tr key={doctor._id} className="hover:bg-base-200">
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
                        <div className="font-bold">{doctor.name}</div>
                        <div className="text-sm opacity-50">
                          {doctor.hospital?.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{doctor.specialization}</td>
                  <td>{doctor.phone}</td>
                  <th>
                    <div className="">
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
                  </th>
                </tr>
              ))
            ) : (
              <tr className="text-center col-span-3 text-base-content/50 text-lg mt-10">
                <td colSpan={5}>No Doctor pending approval.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ApproveDoctorPage;
