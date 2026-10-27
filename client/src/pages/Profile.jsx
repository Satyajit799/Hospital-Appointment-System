import { useEffect, useState } from "react";

import api from "../services/api";

import MainLayout from "../layouts/MainLayout";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get(
        "/users/profile",

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return (
      <MainLayout>
        <div
          className="
      flex
      justify-center
      items-center
      h-[70vh]
      "
        >
          <div
            className="
      animate-spin
      rounded-full
      h-12
      w-12
      border-b-2
      border-blue-600
      "
          ></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div
        className="
    max-w-3xl
    mx-auto
    p-6
    "
      >
        <div
          className="
      bg-white
      dark:bg-gray-800
      rounded-3xl
      shadow-xl
      p-10
      text-center
      "
        >
          <div
            className="
        w-28
        h-28
        mx-auto
        rounded-full
        bg-blue-100
        flex
        justify-center
        items-center
        text-5xl
        "
          >
            👤
          </div>

          <h1
            className="
        text-3xl
        font-bold
        mt-6
        "
          >
            {user.name}
          </h1>

          <p
            className="
        text-gray-500
        dark:text-gray-300
        mt-3
        "
          >
            {user.email}
          </p>

          <span
            className="
        inline-block
        mt-5
        bg-blue-100
        text-blue-700
        px-5
        py-2
        rounded-full
        font-semibold
        "
          >
            {user.role}
          </span>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
