"use client";
import { useUser } from "@/context/UserContext";
import { Hospital } from "@/types/hospital";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ApproveAdminsPage = () => {
  const { user } = useUser();
  const [hospital, setHospital] = useState<Hospital>();
  if (!user) return null;
  const [newHospital, setNewHospital] = useState({
    name: "",
    address: "",
    contact: "",
    coordinates: {
      type: "Point",
      coordinates: [0.0, 0.0],
    },
  });
  useEffect(() => {
    fetchHospital();
  }, []);
  const fetchHospital = async () => {
    try {
      const response = await axios.get(
        `/api/hospital/getHospital?id=${user.id}`
      );
      setHospital(response.data.hospital);
    } catch (error) {
      console.error(error);
    }
  };
  const handleAddhospital = async () => {
    if (!newHospital.name || !newHospital.address || !newHospital.contact) {
      toast.error("All Fields are required");
      return;
    }
    if (newHospital.contact.length !== 10) {
      toast.error("Contact number should be 10 digits");
      return;
    }
    if (!navigator.geolocation) {
      toast.error("Location not available");
      return;
    }
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      setNewHospital({
        ...newHospital,
        coordinates: {
          type: "Point",
          coordinates: [position.coords.latitude, position.coords.longitude],
        },
      });
      try {
        const res = axios.post(`/api/hospital/addHospital`, {
          newHospital,
          user: user.id,
        });
        toast.promise(res, {
          loading: "Adding Hospital...",
          success: () => {
            fetchHospital();
            return "Hospital Added successfully";
          },
          error: "Failed to add hospital",
        });
      } catch (error) {
        console.error(error);
        toast.error("Failed to add");
      }
    });
  };
  return (
    <>
      <h1 className="text-4xl font-bold text-center text-base-content">
        Manage Hospitals
      </h1>
      <div className="mt-6">
        {hospital ? (
          <div className="card bg-base-300 shadow-xl p-6 rounded-lg">
            <div className="text-center py-4 text-2xl font-semibold bg-base-100 rounded-lg">
              {hospital.name}
            </div>
            <div className="card-body">
              <div className="flex items-center justify-between">
                <h2 className="card-title text-lg text-center">
                  {hospital.address} - {hospital.contact}
                </h2>
                <Link
                  href={`https://www.google.com/maps/search/?api=1&query=${hospital.coordinates.coordinates[0]},${hospital.coordinates.coordinates[1]}`}
                  target="_blank"
                >
                  View on Map
                </Link>
              </div>
              <hr className="animate-pulse my-4" />
              <h1 className="text-xl font-medium">Doctor</h1>
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  <thead>
                    <tr>
                      <th className="px-2 py-4">#</th>
                      <th className="px-2 py-4">Name</th>
                      <th className="px-2 py-4">Specialization</th>
                      <th className="px-2 py-4">Experience</th>
                    </tr>
                  </thead>
                  <tbody className="list-disc pl-5">
                    {hospital.doctors?.length > 0 ? (
                      hospital.doctors.map((doctors, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            <div className="flex items-center gap-3">
                              <div className="avatar">
                                <div className="mask mask-squircle h-12 w-12">
                                  <img
                                    src={
                                      "https://www.shutterstock.com/image-photo/profile-photo-attractive-family-doc-600nw-1724693776.jpg"
                                    }
                                    alt={doctors.name}
                                  />
                                </div>
                              </div>
                              <div>
                                <div className="font-bold">{doctors.name}</div>
                                <div className="text-sm opacity-50">
                                  +91 {doctors.phone}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>{doctors.specialization}</td>
                          <td>{doctors.experience}</td>
                        </tr>
                      ))
                    ) : (
                      <tr className="text-base-content">
                        <th>No Doctors</th>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="shadow-lg rounded-xl p-6 px-10 mt-5 bg-base-300 w-full">
            <h2 className="text-2xl font-semibold text-center text-base-content">
              Add New Hospital
            </h2>
            <div className="space-y-4 mt-4 p-6 bg-base-200 rounded-lg">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-base-content">
                    Hospital Name <span className="text-error">*</span>
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Enter hospital name"
                  className="input input-bordered bg-base-100"
                  value={newHospital.name}
                  onChange={(e) =>
                    setNewHospital({ ...newHospital, name: e.target.value })
                  }
                />
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-base-content">
                    Hospital Address <span className="text-error">*</span>
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Enter hospital address"
                  className="input input-bordered bg-base-100"
                  value={newHospital.address}
                  onChange={(e) =>
                    setNewHospital({ ...newHospital, address: e.target.value })
                  }
                />
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-base-content">
                    Hospital Contact No. <span className="text-error">*</span>
                  </span>
                </div>
                <input
                  type="text"
                  minLength={10}
                  maxLength={10}
                  placeholder="Enter hospital contact"
                  className="input input-bordered bg-base-100"
                  value={newHospital.contact}
                  onChange={(e) =>
                    setNewHospital({ ...newHospital, contact: e.target.value })
                  }
                />
              </label>
              <button
                className="btn btn-primary w-full"
                onClick={handleAddhospital}
              >
                Add Hospital
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default ApproveAdminsPage;
