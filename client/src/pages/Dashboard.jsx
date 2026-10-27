import MainLayout from "../layouts/MainLayout";

import DashboardCard from "../components/DashboardCard";

import { FaUserDoctor } from "react-icons/fa6";

import { FaCalendarCheck } from "react-icons/fa";

import { FaUser } from "react-icons/fa";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <MainLayout>
      <div
        className="
      max-w-7xl
      mx-auto
      p-6
      "
      >
        {/* Welcome Banner */}

        <div
          className="
        bg-linear-to-r
        from-blue-500
        to-blue-700
        text-white
        rounded-3xl
        p-10
        mb-10
        shadow-lg
        "
        >
          <h1
            className="
          text-4xl
          font-bold
          "
          >
            Hello,
            {user?.name}
            👋
          </h1>

          <p
            className="
          mt-3
          text-lg
          "
          >
            Welcome back to MediCare
          </p>
        </div>

        {/* Stats */}

        <div
          className="
        grid
        md:grid-cols-2
        lg:grid-cols-3
        gap-6
        "
        >
          <DashboardCard title="Doctors" value="View" icon={<FaUserDoctor />} />

          <DashboardCard
            title="Appointments"
            value="Manage"
            icon={<FaCalendarCheck />}
          />

          <DashboardCard title="Role" value={user?.role} icon={<FaUser />} />
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
