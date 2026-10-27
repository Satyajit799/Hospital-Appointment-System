import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import api from "../services/api";
import MainLayout from "./../layouts/MainLayout";

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get(
        "/doctor-dashboard/appointments",

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

  const updateStatus = async (
    id,

    status,
  ) => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/doctor-dashboard/appointments/${id}`,

        {
          status,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Status Updated");

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
          Doctor Dashboard
        </h1>

        <div
          className="
grid
md:grid-cols-2
gap-6
"
        >
          {appointments.map((appointment) => (
            <div
              key={appointment._id}
              className="
bg-white
shadow-md
rounded-2xl
p-6
"
            >
              <h2
                className="
text-2xl
font-bold
"
              >
                {appointment.patient?.name}
              </h2>

              <p
                className="
text-gray-600
mt-2
"
              >
                {appointment.patient?.email}
              </p>

              <p
                className="
mt-4
"
              >
                📅
                {new Date(appointment.appointmentDate).toLocaleDateString(
                  "en-IN",

                  {
                    day: "numeric",

                    month: "long",

                    year: "numeric",
                  },
                )}
              </p>

              <p
                className="
mt-2
"
              >
                🕒
                {appointment.appointmentTime}
              </p>

              <p
                className="
mt-4
"
              >
                Status :
                <span
                  className={`

ml-2

font-semibold

${
  appointment.status === "pending"
    ? "text-yellow-500"
    : appointment.status === "confirmed"
      ? "text-green-600"
      : appointment.status === "completed"
        ? "text-blue-600"
        : "text-red-600"
}

`}
                >
                  {appointment.status}
                </span>
              </p>

              <div
                className="
flex
gap-3
mt-5
"
              >
                {appointment.status === "pending" && (
                  <button
                    onClick={() =>
                      updateStatus(
                        appointment._id,

                        "confirmed",
                      )
                    }
                    className="
bg-green-500
hover:bg-green-600
text-white
px-4
py-2
rounded-lg
"
                  >
                    Confirm
                  </button>
                )}

                {appointment.status === "confirmed" && (
                  <button
                    onClick={() =>
                      updateStatus(
                        appointment._id,

                        "completed",
                      )
                    }
                    className="
bg-blue-500
hover:bg-blue-600
text-white
px-4
py-2
rounded-lg
"
                  >
                    Complete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default DoctorDashboard;
