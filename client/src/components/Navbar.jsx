import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  RiArrowDropDownFill,
  RiUserFill,
  RiSunFill,
  RiMoonFill,
} from "@remixicon/react";
import { useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark",
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");

      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");

      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const logout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav
      className="
    bg-white
    shadow-md
    px-8
    py-4
    flex
    justify-between
    items-center
    "
    >
      <Link
        to="/dashboard"
        className="
      text-2xl
      font-bold
      text-blue-600
      "
      >
        MediCare
      </Link>

      <div
        className="
      flex
      gap-6
      items-center
      "
      >
        {user?.role === "patient" && (
          <>
            <Link to="/dashboard">Dashboard</Link>

            <Link to="/doctors">Doctors</Link>

            <Link to="/my-appointments">My Appointments</Link>
          </>
        )}

        {user?.role === "doctor" && (
          <>
            <Link to="/doctor-dashboard">Doctor Dashboard</Link>
          </>
        )}

        {user?.role === "admin" && (
          <>
            <Link to="/admin-dashboard">Admin Dashboard</Link>

            <Link to="/doctors">Doctors</Link>
          </>
        )}

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4
py-2
rounded-xl
"
        >
          {darkMode ? <RiSunFill /> : <RiMoonFill />}
        </button>

        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="
  flex
  items-center
  gap-2
  bg-gray-100
  px-4
  py-2
  rounded-xl
  hover:bg-gray-200
  "
          >
            <RiUserFill />
            {user?.name}
            <RiArrowDropDownFill size={30} className="inline-block" />
          </button>

          {open && (
            <div
              className="

  absolute

  right-0

  mt-2

  w-48

  bg-white

  shadow-lg

  rounded-xl

  overflow-hidden

  z-50

  "
            >
              <Link
                to="/profile"
                className="
block
px-4
py-3
hover:bg-gray-100
"
              >
                My Profile
              </Link>
              <div
                className="
    px-4
    py-3
    border-b
    "
              >
                <p
                  className="
      font-semibold
      "
                >
                  {user?.name}
                </p>

                <p
                  className="
      text-sm
      text-gray-500
      "
                >
                  {user?.email}
                </p>
                <p
                  className="
text-xs
text-blue-500
"
                >
                  {user?.role}
                </p>
              </div>

              <button
                onClick={logout}
                className="
    w-full
    text-left
    px-4
    py-3
    hover:bg-red-50
    text-red-500
    "
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
