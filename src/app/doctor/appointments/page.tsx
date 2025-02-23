"use client";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import {
  IconCheck,
  IconX,
  IconUser,
  IconClipboardText,
} from "@tabler/icons-react";
import toast from "react-hot-toast";
import { useUser } from "@/context/UserContext";
import Link from "next/link";

interface Appointment {
  _id: string;
  patient: { _id: string; name: string };
  date: string;
  time: string;
  reason: string;
  status: "Upcoming" | "Completed" | "Canceled";
}

const AppointmentPage = () => {
  const { user } = useUser();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [search, setSearch] = useState("");
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [formData, setFormData] = useState({
    diagnosis: "",
    prescriptions: "",
    treatment: "",
  });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get("/api/doctor/appointments");
      setAppointments(response.data.appointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleUpdateStatus = async (
    id: string,
    newStatus: "Completed" | "Canceled"
  ) => {
    try {
      const response = axios.put(
        `/api/appointments?id=${id}&status=${newStatus}`
      );
      toast.promise(response, {
        loading: "Updating appointment...",
        success: () => {
          fetchAppointments();
          return `Appointment ${newStatus.toLowerCase()} successfully`;
        },
        error: (err: any) => err.response.data.message,
      });
    } catch (error) {
      console.error("Error updating appointment:", error);
      toast.error("Failed to update appointment status.");
    }
  };

  const handlePrescriptionUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB");
        return;
      }
      const uploadFormData = new FormData();
      uploadFormData.append("file", file as Blob);
      const imageResponse = axios.post(
        "/api/helper/upload-img",
        uploadFormData
      );
      toast.promise(imageResponse, {
        loading: "Uploading Image...",
        success: (data: AxiosResponse) => {
          setFormData({
            ...formData,
            prescriptions: data.data.data.url,
          });
          return "Image Uploaded Successfully";
        },
        error: (err: unknown) => {
          if (axios.isAxiosError(err) && err.response) {
            return `This just happened: ${err.response.data.error}`;
          }
          return "An unknown error occurred";
        },
      });
    }
  };

  const handleSubmitDiagnosis = async () => {
    console.log(formData);
    if (!formData.diagnosis || !formData.prescriptions || !formData.treatment) {
      toast.error("Please fill all fields.");
      return;
    }
    try {
      const response = axios.post("/api/appointments/diagnosis", {
        patient: selectedAppointment?.patient._id,
        doctor: user?.id,
        formData,
      });
      toast.promise(response, {
        loading: "Submitting diagnosis...",
        success: () => {
          toast.success("Diagnosis submitted successfully.");
          setSelectedAppointment(null);
          fetchAppointments();
        },
        error: (err: any) => err.response.data.message,
      });
    } catch (error) {
      console.error("Error submitting diagnosis:", error);
      toast.error("Failed to save diagnosis.");
    }
  };

  const filteredAppointments = appointments.filter((appointment) =>
    appointment.patient.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <h1 className="text-3xl font-semibold text-center text-base-content/90">
        Manage Appointments
      </h1>
      <div className="flex justify-between items-center my-4">
        <input
          type="text"
          placeholder="Search by patient name..."
          className="input input-bordered w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto bg-base-300 p-4 rounded-lg shadow-md">
        <table className="table w-full table-zebra">
          <thead>
            <tr className="text-base-content/80 text-base">
              <th>#</th>
              <th>Date</th>
              <th>Time</th>
              <th>Patient</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment, index) => (
                <tr key={appointment._id} className="text-base-content/80">
                  <td>{index + 1}</td>
                  <td>{new Date(appointment.date).toLocaleDateString()}</td>
                  <td>{appointment.time}</td>
                  <td className="flex items-center gap-1">
                    <Link
                      href={`/doctor/medical-history?id=${appointment.patient._id}`}
                    >
                      <IconUser className="text-primary" />{" "}
                      {appointment.patient.name}
                    </Link>
                  </td>
                  <td>{appointment.reason}</td>
                  <td>
                    <span
                      className={`badge badge-lg ${
                        appointment.status === "Upcoming"
                          ? "badge-warning text-warning-content"
                          : appointment.status === "Completed"
                          ? "badge-success text-success-content"
                          : "badge-error text-error-content"
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </td>
                  <td className="flex gap-2 w-full">
                    {appointment.status === "Upcoming" ? (
                      <>
                        <button
                          className="btn btn-success btn-outline text-success-content"
                          onClick={() =>
                            handleUpdateStatus(appointment._id, "Completed")
                          }
                        >
                          <IconCheck /> Accept
                        </button>
                        <button
                          className="btn btn-error btn-outline text-error-content"
                          onClick={() =>
                            handleUpdateStatus(appointment._id, "Canceled")
                          }
                        >
                          <IconX /> Reject
                        </button>
                      </>
                    ) : (
                      <button
                        className="btn btn-outline"
                        onClick={() => setSelectedAppointment(appointment)}
                      >
                        <IconClipboardText /> {appointment.status}
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-4 text-base-content/50"
                >
                  No pending appointments.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Diagnosis Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-base-100 bg-opacity-50 flex items-center justify-center">
          <div className="bg-base-300 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold text-base-content/90 text-center">
              Add Diagnosis & Prescription
            </h2>

            <div className="mt-4">
              <label className="block text-base-content/80 font-medium">
                Diagnosis
              </label>
              <textarea
                className="textarea textarea-bordered w-full"
                value={formData.diagnosis}
                onChange={(e) =>
                  setFormData({ ...formData, diagnosis: e.target.value })
                }
              />
            </div>

            <div className="mt-4">
              <label className="block text-base-content/80 font-medium">
                Prescriptions
              </label>
              <input
                type="file"
                className="file-input input-bordered w-full"
                accept="image/* .jpg, .jpeg, .png, .pdf"
                onChange={(e) =>
                  handlePrescriptionUpload(
                    e as React.ChangeEvent<HTMLInputElement>
                  )
                }
              />
            </div>

            <div className="mt-4">
              <label className="block text-base-content/80 font-medium">
                Treatment
              </label>
              <textarea
                className="textarea textarea-bordered w-full"
                value={formData.treatment}
                onChange={(e) => {
                  setFormData({ ...formData, treatment: e.target.value });
                }}
              />
            </div>

            <div className="flex justify-between mt-6">
              <button
                className="btn btn-outline w-1/2 mr-2"
                onClick={() => setSelectedAppointment(null)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary w-1/2"
                onClick={handleSubmitDiagnosis}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppointmentPage;
