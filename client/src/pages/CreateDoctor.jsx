import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
import MainLayout from "../layouts/MainLayout";

const CreateDoctor = () => {
  const navigate = useNavigate();

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
    experience: "",
    fees: "",
    image: "",
    availableDays: [],
    availableTime: {
      start: "",
      end: "",
    },
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleDayChange = (day) => {
    if (formData.availableDays.includes(day)) {
      setFormData({
        ...formData,

        availableDays: formData.availableDays.filter((d) => d !== day),
      });
    } else {
      setFormData({
        ...formData,

        availableDays: [...formData.availableDays, day],
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/doctors/create-with-user",

        formData,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Doctor Created Successfully");

      navigate("/admin-dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto p-6">
        <div
          className="
        bg-white
        dark:bg-gray-800
        rounded-3xl
        shadow-xl
        p-8
        "
        >
          <h1
            className="
          text-3xl
          font-bold
          mb-8
          "
          >
            Create Doctor
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Doctor Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
            />

            <input
              type="text"
              name="specialization"
              placeholder="Specialization"
              value={formData.specialization}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
            />

            <input
              type="number"
              name="experience"
              placeholder="Experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
            />

            <input
              type="number"
              name="fees"
              placeholder="Fees"
              value={formData.fees}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
            />

            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
            />

            {/* Available Days */}

            <div>
              <h2
                className="
              font-semibold
              mb-3
              "
              >
                Available Days
              </h2>

              <div
                className="
              grid
              grid-cols-2
              md:grid-cols-4
              gap-3
              "
              >
                {days.map((day) => (
                  <label
                    key={day}
                    className="
                  flex
                  items-center
                  gap-2
                  bg-gray-100
                  dark:bg-gray-700
                  p-3
                  rounded-xl
                  cursor-pointer
                  "
                  >
                    <input
                      type="checkbox"
                      checked={formData.availableDays.includes(day)}
                      onChange={() => handleDayChange(day)}
                    />

                    {day}
                  </label>
                ))}
              </div>
            </div>

            {/* Available Time */}

            <div
              className="
            grid
            md:grid-cols-2
            gap-4
            "
            >
              <input
                type="time"
                value={formData.availableTime.start}
                onChange={(e) =>
                  setFormData({
                    ...formData,

                    availableTime: {
                      ...formData.availableTime,

                      start: e.target.value,
                    },
                  })
                }
                className="
                border
                rounded-xl
                p-3
                "
              />

              <input
                type="time"
                value={formData.availableTime.end}
                onChange={(e) =>
                  setFormData({
                    ...formData,

                    availableTime: {
                      ...formData.availableTime,

                      end: e.target.value,
                    },
                  })
                }
                className="
                border
                rounded-xl
                p-3
                "
              />
            </div>

            <button
              type="submit"
              className="
              w-full
              bg-blue-600
              hover:bg-blue-700
              text-white
              py-3
              rounded-xl
              font-semibold
              "
            >
              Create Doctor
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default CreateDoctor;
