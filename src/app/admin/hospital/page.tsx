"use client";
import { useUser } from "@/context/UserContext";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ApproveAdminsPage = () => {
  const { user } = useUser();
  const [hospital, setHospital] = useState({
    name: "",
    address: "",
    contact: "",
    coordinates: {
      type: "Point",
      coordinates: [0.0, 0.0],
    },
  });
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
    if (!navigator.geolocation) {
      toast.error("Location not available");
      return;
    }
    navigator.geolocation.getCurrentPosition((position) => {
      setNewHospital({
        ...newHospital,
        coordinates: {
          type: "Point",
          coordinates: [position.coords.latitude, position.coords.longitude],
        },
      });
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
  };
  return (
    <>
      <h1 className="text-4xl font-bold text-center text-base-content mt-6">
        Manage Hospitals
      </h1>
      <div className="w-full flex justify-center mt-8">
        {hospital ? (
          <div className="bg-base-100 shadow-lg rounded-xl p-6 max-w-lg w-full border border-base-300">
            <h2 className="text-2xl font-semibold text-base-content">
              {hospital.name}
            </h2>
            <p className="text-base-content/80 mt-2">{hospital.address}</p>
            <p className="text-base-content/80">{hospital.contact}</p>
            <Link href={`https://google`} className="link link-primary">
              View On Map
            </Link>
          </div>
        ) : (
          <div className="shadow-lg rounded-xl p-6 mt-5 bg-base-100 border border-base-300 max-w-lg w-full">
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
