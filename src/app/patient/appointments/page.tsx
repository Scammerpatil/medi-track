"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { IconCheck, IconX, IconClock } from "@tabler/icons-react";

interface Appointment {
  _id: string;
  date: string;
  time: string;
  doctor: { name: string; specialization: string };
  status: "Upcoming" | "Completed" | "Canceled";
}

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("/api/patient/appointments");
        setAppointments(response.data.appointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    fetchAppointments();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-semibold text-center text-base-content/90">
        My Appointments
      </h1>
      <div className="flex justify-between items-center my-4">
        <input
          type="text"
          placeholder="Search by doctor name..."
          className="input input-bordered w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto bg-base-300 p-4 rounded-lg shadow-md">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="text-base-content/60 text-base">
              <th>#</th>
              <th>Date</th>
              <th>Time</th>
              <th>Doctor</th>
              <th>Specialization</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((appointment, index) => (
                <tr
                  key={appointment._id}
                  className="text-base-content/80 text-base"
                >
                  <td>{index + 1}</td>
                  <td>{new Date(appointment.date).toLocaleDateString()}</td>
                  <td>{appointment.time}</td>
                  <td>{appointment.doctor.name}</td>
                  <td>{appointment.doctor.specialization}</td>
                  <td>
                    {appointment.status === "Upcoming" && (
                      <span className="badge badge-warning text-base-content/10 text-warning-content badge-outline bagde-lg px-3 py-5 ">
                        <IconClock className="my-2" /> Upcoming
                      </span>
                    )}
                    {appointment.status === "Completed" && (
                      <span className="badge badge-success text-base-content/10 text-success-content badge-outline bagde-lg px-3 py-5">
                        <IconCheck className="my-2" /> Completed
                      </span>
                    )}
                    {appointment.status === "Canceled" && (
                      <span className="badge badge-error text-base-content/10 text-error-content badge-outline bagde-lg px-3 py-5">
                        <IconX className="my-2" /> Canceled
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="text-base text-center py-4 text-base-content/50"
                >
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AppointmentsPage;
