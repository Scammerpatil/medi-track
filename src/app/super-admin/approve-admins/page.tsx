"use client";
import { User } from "@/types/user";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ApproveAdminsPage = () => {
  const [admins, setAdmins] = useState([]);
  useEffect(() => {
    fetchApproveAdmins();
  }, []);
  const fetchApproveAdmins = async () => {
    try {
      const response = await axios.get("/api/admin/");
      setAdmins(response.data.admins);
    } catch (error) {
      console.error(error);
    }
  };
  const handleApprove = (id: string, isApproved: boolean) => async () => {
    try {
      const res = axios.put(
        `/api/admin/approve?id=${id}&isApproved=${isApproved}`
      );
      toast.promise(res, {
        loading: "Approving...",
        success: () => {
          fetchApproveAdmins();
          return "Approved successfully";
        },
        error: "Failed to approve",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to approve");
    }
  };
  return (
    <>
      <h1 className="text-3xl font-semibold text-center">Approve Admins</h1>
      <div className="flex flex-wrap justify-center">
        {admins.map((admin: User, index: number) => (
          <div key={index} className="m-4">
            <div className="bg-base-300 shadow-md rounded-lg p-6">
              <div className="flex justify-between items-center space-x-4">
                <div>
                  <img
                    src={`https://avatar.iran.liara.run/public/${index}`}
                    alt={admin.name}
                    className="w-16 h-16 rounded-full"
                  />
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">{admin.name}</h2>
                  <p className="text-base-content/90">{admin.email}</p>
                </div>
                <div className="">
                  {!admin.isApproved ? (
                    <button
                      className="btn btn-success rounded-lg"
                      onClick={handleApprove(admin._id as string, true)}
                    >
                      Approve
                    </button>
                  ) : (
                    <button
                      className="btn btn-error rounded-lg"
                      onClick={handleApprove(admin._id, false)}
                    >
                      Reject
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default ApproveAdminsPage;
