import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post(
        "/auth/login",

        formData,
      );

      localStorage.setItem(
        "token",

        res.data.token,
      );

      localStorage.setItem(
        "user",

        JSON.stringify(res.data),
      );

      toast.success("Login Successful");

      if (res.data.role === "patient") {
        navigate("/dashboard");
      } else if (res.data.role === "doctor") {
        navigate("/doctor-dashboard");
      } else {
        navigate("/admin-dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gray-100
    "
    >
      <form
        onSubmit={handleSubmit}
        className="
      bg-white
      p-8
      rounded-xl
      shadow-lg
      w-full
      max-w-md
      "
      >
        <h1
          className="
        text-2xl
        font-bold
        mb-6
        "
        >
          Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="
        w-full
        border
        p-3
        rounded-lg
        mb-4
        "
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="
        w-full
        border
        p-3
        rounded-lg
        mb-4
        "
        />

        <button
          className="
        w-full
        bg-blue-600
        text-white
        py-3
        rounded-lg
        hover:bg-blue-700
        "
        >
          Login
        </button>

        <p
          className="
        text-center
        mt-4
        "
        >
          Don't have an account?
          <Link
            to="/register"
            className="
          text-blue-600
          ml-2
          "
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
