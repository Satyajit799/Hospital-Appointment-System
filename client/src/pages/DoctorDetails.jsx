import { useEffect, useState } from "react";
import { RiStarFill, RiAlarmLine } from "@remixicon/react";
import { useParams } from "react-router-dom";

import api from "../services/api";
import { toast } from "react-toastify";
import MainLayout from "./../layouts/MainLayout";

const DoctorDetails = () => {
  const { id } = useParams();

  const [appointmentData, setAppointmentData] = useState({
    appointmentDate: "",

    appointmentTime: "",
  });

  const handleChange = (e) => {
    setAppointmentData({
      ...appointmentData,

      [e.target.name]: e.target.value,
    });
  };

  const handleBookAppointment = async () => {
    const today = new Date().toISOString().split("T")[0];

    if (appointmentData.appointmentDate < today) {
      toast.error("Past dates are not allowed");

      return;
    }

    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/appointments",

        {
          doctorId: doctor._id,

          appointmentDate: appointmentData.appointmentDate,

          appointmentTime: appointmentData.appointmentTime,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Appointment Booked Successfully");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    fetchDoctor();
  }, []);

  const fetchDoctor = async () => {
    try {
      const res = await api.get(`/doctors/${id}`);

      setDoctor(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!doctor) {
    return <h1>Loading...</h1>;
  }

  return (
    <MainLayout>
      <div className=" max-w-3xl mx-auto p-6 text-black dark:bg-gray-800">
        <div
          className="
bg-white/80 
backdrop-blur-lg
rounded-3xl
shadow-xl
p-8
border
border-gray-100
"
        >
          <div className="flex justify-center">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="
  w-36
  h-36
  rounded-full
  object-cover
  border-4
  border-blue-100
  shadow-lg
  "
            />
          </div>
          <div
            className="
flex
justify-center
mt-4
"
          >
            <span
              className="
bg-blue-100
text-blue-700
px-5
py-2
rounded-full
font-medium
"
            >
              {doctor.specialization}
            </span>
          </div>

          <div
            className="
grid
grid-cols-2
gap-4
mt-8
"
          >
            <div
              className="
bg-yellow-50
rounded-2xl
p-5
text-center
"
            >
              <p className="text-3xl">
                <RiStarFill
                  className="inline-block"
                  color="rgba(240,187,64,1)"
                />
              </p>

              <p
                className="
font-semibold
mt-2
"
              >
                {doctor.experience}
                Years
              </p>
            </div>

            <div
              className="
bg-green-50
rounded-2xl
p-5
text-center
"
            >
              <p className="text-3xl">💰</p>

              <p
                className="
font-semibold
mt-2
"
              >
                ₹{doctor.fees}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="font-semibold">Available Days</h2>

            <div
              className="
flex
flex-wrap
gap-3
mt-4
justify-center
"
            >
              {doctor.availableDays.map((day) => (
                <span
                  key={day}
                  className="
bg-blue-100
text-blue-700
px-5
py-2
rounded-full
font-medium
"
                >
                  {day}
                </span>
              ))}
            </div>
          </div>

          <div
            className="
mt-8
text-center
"
          >
            <p
              className="
font-semibold
text-gray-700
"
            >
              <RiAlarmLine className="inline-block" /> Available Time
            </p>

            <p
              className="
text-lg
mt-2
"
            >
              {doctor.availableTime.start}-{doctor.availableTime.end}
            </p>
          </div>

          <div className="mt-8">
            <input
              type="date"
              name="appointmentDate"
              value={appointmentData.appointmentDate}
              onChange={handleChange}
              className="
w-full
border
rounded-lg
p-3
mb-4
"
            />

            <input
              type="time"
              name="appointmentTime"
              value={appointmentData.appointmentTime}
              onChange={handleChange}
              className="
w-full
border
rounded-lg
p-3
mb-4
"
            />

            <button
              onClick={handleBookAppointment}
              className="
w-full
mt-6
bg-linear-to-r
from-blue-500
to-blue-700
hover:scale-105
transition-all
duration-300
text-white
py-4
rounded-2xl
font-semibold
shadow-lg
"
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DoctorDetails;
