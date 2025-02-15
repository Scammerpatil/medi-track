"use client";
import { useUser } from "@/context/UserContext";
import { User } from "@/types/user";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ApproveAdminsPage = () => {
  const { user } = useUser();
  const [hospital, setHospital] = useState();
  if (!user) return null;
  const [newHospital, setNewHospital] = useState({
    name: "",
    address: "",
    contact: "",
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
    <div>
      <h1 className="text-3xl font-semibold text-center">Manage Hospitals</h1>
      <div className="w-full">
        {hospital ? (
          <div className="bg-base-200 shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold">{hospital.name}</h2>
            <p className="text-base-content/90">{hospital.address}</p>
            <p className="text-base-content/90">{hospital.contact}</p>
          </div>
        ) : (
          <div className="bg-base-300 shadow-md rounded-lg p-6 mt-5">
            <h2 className="text-xl font-semibold text-center">
              Add New Hospital
            </h2>
            <div className="border border-base-content rounded-md space-y-4 mt-4 p-10 bg-base-200">
              <label htmlFor="hospitalName" className="form-control w-full">
                <div className="label">
                  <span className="label-text">
                    Hospital Name <span className="text-red-500">*</span>
                  </span>
                </div>
                <input
                  type="text"
                  id="hospitalName"
                  placeholder="Enter hospital name"
                  className="input input-bordered"
                  value={newHospital.name}
                  onChange={(e) =>
                    setNewHospital({ ...newHospital, name: e.target.value })
                  }
                />
              </label>
              <label htmlFor="hospitalName" className="form-control w-full">
                <div className="label">
                  <span className="label-text">
                    Hospital Address <span className="text-red-500">*</span>
                  </span>
                </div>
                <input
                  type="text"
                  id="hospitalAddress"
                  placeholder="Enter hospital Address"
                  className="input input-bordered"
                  value={newHospital.address}
                  onChange={(e) =>
                    setNewHospital({ ...newHospital, address: e.target.value })
                  }
                />
              </label>
              <label htmlFor="hospitalName" className="form-control w-full">
                <div className="label">
                  <span className="label-text">
                    Hospital Contact No. <span className="text-red-500">*</span>
                  </span>
                </div>
                <input
                  type="text"
                  id="hospitalName"
                  placeholder="Enter hospital name"
                  className="input input-bordered"
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
    </div>
  );
};
export default ApproveAdminsPage;
