"use client";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "",
    specialization: "",
    experience: "",
    availability: [],
    hospital: "",
  });
  const [hospital, setHospital] = useState([]);
  const [disabled, setDisabled] = useState(true);
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
    if (formData.phone.length !== 10) {
      toast.error("Please enter a valid phone number");
      return;
    }
    if (!formData.email.includes("@gmail.com")) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (
      formData.password.length < 8 ||
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(formData.password) ||
      !/^[a-zA-Z0-9!@#$%^&*]{8,20}$/.test(formData.password)
    ) {
      toast.error(
        "Password must be 8 characters long. It should contain atleast one uppercase letter, one lowercase letter, one number"
      );
      return;
    }
    const response = axios.post("/api/auth/signup", { formData });
    toast.promise(response, {
      loading: "Creating Account",
      success: () => {
        router.push("/login");
        return "Account Created Successfully";
      },
      error: (err: any) => {
        console.log(err);
        return err.response.data.message;
      },
    });
  };
  return (
    <div className="flex justify-center items-center w-full bg-base-200 px-5 py-5 min-h-[calc(100vh-5rem)]">
      <div className="xl:max-w-7xl bg-base-100 drop-shadow-xl border border-base-content/20 w-full rounded-md flex justify-between items-stretch px-5 xl:px-5 py-5">
        <div className="sm:w-[60%] lg:w-[50%] bg-cover bg-center items-center justify-center hidden md:flex ">
          <Image
            height={500}
            width={500}
            src="/bg.svg"
            alt="login"
            className="h-[500px]"
          />
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
                  id="phone"
                  minLength={10}
                  maxLength={10}
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
              <label className="input input-primary input-bordered flex items-center gap-2">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Your Password"
                  className="w-full text-base-content placeholder:text-base-content/70"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                  }}
                />
                {showPassword ? (
                  <IconEyeOff
                    size={20}
                    className="cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <IconEye
                    size={20}
                    className="cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </label>
              <label className="input input-primary input-bordered flex items-center gap-2">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Your Password Again"
                  className={`w-full text-base-content placeholder:text-base-content/70 ${
                    formData.password !== formData.confirmPassword
                      ? "border-red-500"
                      : ""
                  }`}
                  value={formData.confirmPassword}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    });
                  }}
                />
                {showPassword ? (
                  <IconEyeOff
                    size={20}
                    className="cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <IconEye
                    size={20}
                    className="cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </label>
              <div className="label">
                <span className="label-text-alt text-error">
                  Password must be 8 characters long. It should contain atleast
                  one uppercase letter, one lowercase letter, one number
                </span>
              </div>
              <div className="flex items-center gap-1.5  justify-start pl-2">
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <input
                      type="checkbox"
                      className="checkbox"
                      onChange={() => {
                        setDisabled(!disabled);
                      }}
                    />
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
                  disabled={
                    disabled || formData.confirmPassword !== formData.password
                  }
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
