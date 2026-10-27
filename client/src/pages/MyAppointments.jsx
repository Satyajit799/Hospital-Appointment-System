import { useEffect, useState } from "react";
import { RiTimeFill, RiCalendar2Line } from "@remixicon/react";
import { toast } from "react-toastify";

import api from "../services/api";
import MainLayout from "./../layouts/MainLayout";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get(
        "/appointments/my-appointments",

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setAppointments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/appointments/${id}/cancel`,

        {},

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Appointment Cancelled");

      fetchAppointments();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <MainLayout>
      <div
        className="
max-w-6xl
mx-auto
p-6
"
      >
        <h1
          className="
text-3xl
font-bold
mb-8
"
        >
          My Appointments
        </h1>

        <div
          className="
grid
md:grid-cols-2
gap-6
"
        >
          {appointments.length === 0 ? (
            <div
              className="
col-span-full
text-center
py-20
"
            >
              <h2
                className="
text-2xl
font-semibold
"
              >
                No Appointments Yet
              </h2>

              <p
                className="
text-gray-500
mt-3
"
              >
                Book your first appointment.
              </p>
            </div>
          ) : (
            appointments.map((appointment) => (
              <div
                key={appointment._id}
                className="
bg-white
rounded-3xl
shadow-lg
p-6
border
border-gray-100
hover:shadow-2xl
transition-all
duration-300
"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={appointment.doctor?.image}
                    alt={appointment.doctor?.name}
                    className="
    w-16
    h-16
    rounded-full
    object-cover
    border-2
    border-blue-100
    "
                  />

                  <div>
                    <h2 className="text-2xl font-bold text-black">
                      {appointment.doctor?.name}
                    </h2>

                    <p className="text-gray-500">
                      {appointment.doctor?.specialization}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 items-center" >
                  <div
                    className="
mt-5
inline-block
bg-blue-50
text-blue-700
px-4
py-2
rounded-full
font-medium
"
                  >
                    < RiCalendar2Line  className="inline-block mr-2"/>
                    {new Date(appointment.appointmentDate).toLocaleDateString(
                      "en-IN",

                      {
                        day: "numeric",

                        month: "long",

                        year: "numeric",
                      },
                    )}
                  </div>

                  <div
                    className="
mt-5
inline-block
bg-purple-100
text-purple-700
px-4
py-2
rounded-full
font-medium
"
                  >
                    <RiTimeFill size={20} className="inline-block mr-2" />
                    {appointment.appointmentTime}
                  </div>
                </div>

                <p
                  className="
mt-4 text-black
"
                >
                  Status :
                  <span
                    className={`

ml-3

px-4

py-2

rounded-full

font-semibold

${
  appointment.status === "pending"
    ? "bg-yellow-100 text-yellow-700"
    : appointment.status === "confirmed"
      ? "bg-green-100 text-green-700"
      : appointment.status === "completed"
        ? "bg-blue-100 text-blue-700"
        : "bg-red-100 text-red-700"
}

`}
                  >
                    {appointment.status}
                  </span>
                </p>

                {appointment.status === "pending" ||
                appointment.status === "confirmed" ? (
                  <button
                    onClick={() => handleCancel(appointment._id)}
                    className="

mt-5

bg-red-500

hover:bg-red-600

text-white

px-4

py-2

rounded-lg

"
                  >
                    Cancel Appointment
                  </button>
                ) : (
                  <p
                    className="
mt-5
text-red-500
font-medium
"
                  >
                    Appointment
                    {appointment.status}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default MyAppointments;
