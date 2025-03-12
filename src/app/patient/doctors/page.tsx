"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { IconUser, IconStethoscope, IconPhone } from "@tabler/icons-react";
import toast from "react-hot-toast";
import { Doctor } from "@/types/doctor";
import { useUser } from "@/context/UserContext";
import { useSearchParams } from "next/navigation";

const DoctorsPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { user } = useUser();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    doctorId: "",
    date: "",
    time: "",
    reason: "",
  });
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`/api/doctor/get?id=${id}`);
        setDoctors(response.data.doctors);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, [id]);

  const handleBookAppointment = async () => {
    if (
      !formData.date ||
      !formData.time ||
      !formData.doctorId ||
      !formData.reason
    ) {
      toast.error("Please select date and time.");
      return;
    }

    if (new Date(formData.date) < new Date()) {
      toast.error("Please select a future date.");
      return;
    }

    try {
      const response = axios.post("/api/appointments/book", {
        formData,
        patient: user?.id,
      });
      toast.promise(response, {
        loading: "Booking appointment...",
        success: () => {
          setSelectedDoctor(null);
          return "Appointment booked successfully!";
        },
        error: "Failed to book appointment.",
      });
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error("Failed to book appointment.");
    }
  };

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <h1 className="text-3xl font-semibold text-center text-base-content/90">
        Book an Appointment
      </h1>
      <div className="flex justify-between items-center my-4">
        <input
          type="text"
          placeholder="Search by doctor name..."
          className="input input-bordered w-full max-w-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <div
              key={doctor._id}
              className="card bg-base-300 shadow-md rounded-lg hover:shadow-lg"
            >
              <div className="card-body">
                <h2 className="card-title text-xl font-medium text-base-content/90 flex items-center gap-2">
                  <IconUser className="text-primary" /> {doctor.name}
                </h2>
                <p className="text-base-content/70 flex items-center gap-2">
                  <IconStethoscope /> {doctor.specialization}
                </p>
                <p className="text-base-content/70 flex items-center gap-2">
                  <IconPhone /> {doctor.phone}
                </p>

                <div className="divider" />

                <div className="card-actions justify-center">
                  <button
                    className="btn btn-primary btn-outline text-base-content/10 w-full hover:bg-base-200 transition-all"
                    onClick={() => {
                      formData.doctorId = doctor._id;
                      setSelectedDoctor(doctor);
                    }}
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center col-span-3 text-base-content/50 text-lg mt-10">
            No doctors available.
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 bg-base-100 bg-opacity-50 flex items-center justify-center">
          <div className="bg-base-300 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold text-base-content/90 text-center">
              Book Appointment with <br /> {selectedDoctor.name}
            </h2>
            <p className="text-center text-base-content/70">
              {selectedDoctor.specialization}
            </p>

            <div className="mt-4">
              <label className="block text-base-content/80 font-medium">
                Select Date
              </label>
              <input
                type="date"
                className="input input-bordered w-full"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
            </div>

            <div className="mt-4">
              <label className="block text-base-content/80 font-medium">
                Select Time
              </label>
              <input
                type="time"
                className="input input-bordered w-full"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
              />
            </div>

            <div className="mt-4">
              <label className="block text-base-content/80 font-medium">
                Reason for Appointment
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={formData.reason}
                onChange={(e) =>
                  setFormData({ ...formData, reason: e.target.value })
                }
              />
            </div>

            <div className="flex justify-between mt-6">
              <button
                className="btn btn-outline w-1/2 mr-2"
                onClick={() => setSelectedDoctor(null)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary w-1/2"
                onClick={handleBookAppointment}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DoctorsPage;
