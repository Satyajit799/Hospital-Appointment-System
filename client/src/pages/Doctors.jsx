import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import MainLayout from "./../layouts/MainLayout";
import { RiStarFill } from "@remixicon/react";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await api.get("/doctors");

      setDoctors(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(search.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Doctors</h1>
        <input
          type="text"
          placeholder="Search doctor by name or specialization..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className=" placeholder:text-black dark:placeholder:text-gray-300
  w-full
  rounded-xl
  border-2 border-blue-500
  px-4
  py-3
  mb-8
  outline-none
  focus:ring-2
  focus:ring-blue-500
  "
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.length === 0 ? (
            <div className="col-span-full text-center py-20">
              <h2 className="text-2xl font-bold">No Doctors Found</h2>

              <p className="text-gray-500 mt-3">
                Try searching with another name or specialization.
              </p>
            </div>
          ) : (
            filteredDoctors.map((doctor) => (
              <Link
                key={doctor._id}
                to={`/doctors/${doctor._id}`}
                className="
  block
  bg-linear-to-br
  from-white
  to-blue-50
  rounded-3xl
  shadow-md
  p-6
  border
  border-gray-100
  hover:shadow-2xl
  hover:scale-105
  transition-all
  duration-300
  "
              >
                {/* Doctor Icon */}

                <div className="flex justify-center mb-4">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="
  w-28
  h-28
  rounded-full
  object-cover
  border-4
  border-blue-100
  shadow-md
  "
                  />
                </div>

                {/* Name */}

                <h2
                  className="
  text-2xl
  font-bold
  text-center
  dark:text-gray-400
  "
                >
                  {doctor.name}
                </h2>

                {/* Specialization */}

                <p
                  className="
  text-center
  text-blue-600
  font-medium
  mt-2
  "
                >
                  {doctor.specialization}
                </p>

                {/* Experience */}

                <div
                  className="
  flex
  justify-center
  mt-5
  "
                >
                  <span
                    className="
    bg-yellow-100
    text-yellow-700
    px-4
    py-2
    rounded-full
    text-sm
    font-medium
    "
                  >
                    <RiStarFill
                      className="inline-block"
                      color="rgba(240,187,64,1)"
                    />{" "}
                    {doctor.experience} Years Experience
                  </span>
                </div>

                {/* Fees */}

                <div
                  className="
  flex
  justify-center
  mt-4
  "
                >
                  <span
                    className="
    bg-green-100
    text-green-700
    px-4
    py-2
    rounded-full
    text-sm
    font-medium
    "
                  >
                    💰 ₹{doctor.fees}
                  </span>
                </div>

                {/* Available Days */}

                <div className="mt-6">
                  <p
                    className="
    font-semibold
    mb-3
    text-gray-700
    "
                  >
                    Available Days
                  </p>

                  <div
                    className="
    flex
    flex-wrap
    gap-2
    "
                  >
                    {doctor.availableDays.map((day) => (
                      <span
                        key={day}
                        className="
        bg-blue-100
        text-blue-700
        px-3
        py-1
        rounded-full
        text-sm
        "
                      >
                        {day}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Button */}

                <button
                  className="
  mt-8
  w-full
  bg-blue-600
  hover:bg-blue-700
  text-white
  py-3
  rounded-xl
  font-semibold
  "
                >
                  View Details
                </button>
              </Link>
            ))
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Doctors;
