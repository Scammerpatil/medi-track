"use client";
import { User } from "@/types/user";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ApproveAdminsPage = () => {
  const [admins, setAdmins] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const adminsPerPage = 20;

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
        loading: "Processing...",
        success: () => {
          fetchApproveAdmins();
          return isApproved ? "Admin Approved" : "Admin Rejected";
        },
        error: "Action failed",
      });
    } catch (error) {
      console.error(error);
      toast.error("Action failed");
    }
  };

  const totalPages = Math.ceil(admins.length / adminsPerPage);
  const paginatedAdmins = admins.slice(
    (currentPage - 1) * adminsPerPage,
    currentPage * adminsPerPage
  );

  return (
    <>
      <h1 className="text-3xl font-semibold text-center text-base-content">
        Approve Admins
      </h1>
      <div className="overflow-x-auto w-full px-10 mt-5">
        <table className="table bg-base-100 rounded-xl">
          <thead className="bg-base-200 text-base-content/80">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedAdmins.map((admin, index) => (
              <tr key={admin._id || index} className="hover:bg-base-200">
                <th>{(currentPage - 1) * adminsPerPage + index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <Image
                          height={10}
                          width={10}
                          src={`https://avatar.iran.liara.run/public/${
                            index + 1
                          }`}
                          alt="Admin Avatar"
                        />
                      </div>
                    </div>
                    <div className="font-medium text-base-content">
                      {admin.name}
                    </div>
                  </div>
                </td>
                <td className="text-base-content/70">{admin.email}</td>
                <td className="text-base-content/70">{admin.phone}</td>
                <td>
                  {!admin.isApproved ? (
                    <button
                      className="btn btn-success btn-sm"
                      onClick={handleApprove(admin._id, true)}
                    >
                      Approve
                    </button>
                  ) : (
                    <button
                      className="btn btn-error btn-sm"
                      onClick={handleApprove(admin._id, false)}
                    >
                      Reject
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center mt-4 gap-2">
          <button
            className="btn btn-sm btn-outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            « Prev
          </button>
          <span className="text-base-content/80">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-sm btn-outline"
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          >
            Next »
          </button>
        </div>
      </div>
    </>
  );
};
export default ApproveAdminsPage;
