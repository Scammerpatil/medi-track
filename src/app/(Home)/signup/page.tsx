"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "",
    specialization: "",
    experience: "",
    availability: [],
    hospital: "",
  });
  const [hospital, setHospital] = useState([]);
  useEffect(() => {
    const fetchHospital = async () => {
      const response = await axios.get("/api/hospital");
      setHospital(response.data.hospitals);
    };
    fetchHospital();
  }, []);
  const router = useRouter();
  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.password
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    if (formData.role === "admin" || formData.role === "patient") {
      delete formData.hospital;
    }
    const response = axios.post("/api/auth/signup", { formData });
    toast.promise(response, {
      loading: "Creating Account",
      success: () => {
        router.push("/login");
        return "Account Created Successfully";
      },
      error: (err: unknown) => {
        console.log(err);
        return err.response.data.message;
      },
    });
  };
  return (
    <div className="flex justify-center items-center w-full bg-base-200 px-5 py-5 min-h-[calc(100vh-5rem)]">
      <div className="xl:max-w-7xl bg-base-100 drop-shadow-xl border border-base-content/20 w-full rounded-md flex justify-between items-stretch px-5 xl:px-5 py-5">
        <div className="sm:w-[60%] lg:w-[50%] bg-cover bg-center items-center justify-center hidden md:flex ">
          <img src="bg.svg" alt="login" className="h-[500px]" />
        </div>
        <div className="mx-auto w-full lg:w-1/2 md:p-10 py-5 md:py-0">
          <h1 className="text-center text-2xl sm:text-3xl font-semibold text-primary">
            Create Account
          </h1>
          <div className="w-full mt-5 sm:mt-8">
            <div className="mx-auto w-full sm:max-w-md md:max-w-lg flex flex-col gap-5">
              <input
                type="text"
                placeholder="Enter Your Full Name"
                className="input input-bordered input-primary w-full text-base-content placeholder:text-base-content/70"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                }}
              />

              <div className="flex flex-col sm:flex-row gap-3 text-base-content">
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="input input-bordered input-primary w-full text-base-content placeholder:text-base-content/70"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                  }}
                />
                <input
                  type="text"
                  placeholder="Enter Your Contact No"
                  className="input input-bordered input-primary w-full text-base-content placeholder:text-base-content/70"
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({ ...formData, phone: e.target.value });
                  }}
                />
              </div>
              <select
                className="input input-bordered input-primary w-full text-base-content placeholder:text-base-content/70"
                value={formData.role}
                onChange={(e) => {
                  setFormData({ ...formData, role: e.target.value });
                }}
              >
                <option value="" disabled>
                  Select User Type
                </option>
                <option value="admin">Hospital Admin</option>
                <option value="doctor">Doctor</option>
                <option value="patient">Patient</option>
              </select>
              {formData.role === "doctor" && (
                <>
                  <input
                    type="text"
                    placeholder="Enter Your Specialization"
                    className="input input-bordered input-primary w-full text-base-content placeholder:text-base-content/70"
                    value={formData.specialization}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        specialization: e.target.value,
                      });
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Enter Your Experience"
                    className="input input-bordered input-primary w-full text-base-content placeholder:text-base-content/70"
                    value={formData.experience}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        experience: e.target.value,
                      });
                    }}
                  />
                  <select
                    className="input input-bordered input-primary w-full text-base-content placeholder:text-base-content/70"
                    onChange={(e) => {
                      setFormData({ ...formData, hospital: e.target.value });
                    }}
                  >
                    <option value="" defaultChecked>
                      Select Hospital
                    </option>
                    {hospital.map((item: { _id: string; name: string }) => (
                      <option value={item._id} key={item._id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </>
              )}
              <input
                type="Password"
                placeholder="Enter Your Password"
                className="input input-bordered input-primary w-full text-base-content placeholder:text-base-content/70"
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                }}
              />
              <div className="flex items-center gap-1.5  justify-start pl-2">
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <input type="checkbox" className="checkbox" />
                  </label>
                </div>
                <h3 className="flex items-center whitespace-nowrap text-base text-base-content">
                  I agree to the
                  <span className="text-primary">&nbsp;Terms</span>
                  &nbsp;and
                  <span className="text-primary">&nbsp;Privacy Policy</span>.
                </h3>
              </div>
              <div className="flex flex-col md:flex-row gap-2 md:gap-4 justify-center items-center">
                <button
                  className="btn btn-outline btn-primary btn-block max-w-[200px]"
                  onClick={handleSubmit}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
