import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import api from "../services/api";
import MainLayout from "./../layouts/MainLayout";
import { useNavigate } from "react-router-dom";
const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalDoctors: 0,

    totalPatients: 0,

    totalAppointments: 0,

    pendingAppointments: 0,

    confirmedAppointments: 0,

    cancelledAppointments: 0,
  });
  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get(
        "/dashboard/admin",

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <MainLayout>
      <div
        className="

max-w-7xl

mx-auto

p-6
"
      >
        <div
          className="
flex
justify-between
items-center
mb-8
"
        >
          <h1
            className="
text-3xl
font-bold
"
          >
            Admin Dashboard
          </h1>

          <button
            onClick={() => navigate("/create-doctor")}
            className="
bg-blue-600
hover:bg-blue-700
text-white
px-5
py-3
rounded-xl
"
          >
            + Create Doctor
          </button>
        </div>

        <div
          className="

grid

md:grid-cols-2

lg:grid-cols-3

gap-6
text-black
"
        >
          <StatCard title="Total Doctors" value={stats.totalDoctors} />

          <StatCard title="Total Patients" value={stats.totalPatients} />

          <StatCard
            title="Total Appointments"
            value={stats.totalAppointments}
          />

          <StatCard title="Pending" value={stats.pendingAppointments} />

          <StatCard title="Confirmed" value={stats.confirmedAppointments} />

          <StatCard title="Cancelled" value={stats.cancelledAppointments} />
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
