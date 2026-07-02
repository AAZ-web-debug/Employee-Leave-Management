import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
  useState("");

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response =
        await api.post(
          "/auth/login",
          formData
        );

      login(
        response.data.token,
        response.data.user
      );

      if (
        response.data.user.role ===
        "manager"
      ) {
        navigate(
          "/manager-dashboard"
        );
      } else {
        navigate(
          "/employee-dashboard"
        );
      }
    } catch (error) {
  setMessage(
    error.response?.data?.message ||
    "Login Failed"
  );
} finally {
  setLoading(false);
}
  };

  return (
    <div
      className="
      min-h-screen
      bg-[#0b0f14]
      flex
      items-center
      justify-center
      px-4
    "
    >
      <div
        className="
        absolute
        inset-0
        bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.15),transparent_40%)]
      "
      />

      <div
        className="
        relative
        w-full
        max-w-md
        rounded-3xl
        border
        border-white/10
        bg-[#12161d]/95
        backdrop-blur-xl
        p-8
        shadow-[0_0_60px_rgba(37,99,235,0.15)]
      "
      >
        <div className="text-center mb-8">
          <h1
            className="
            text-3xl
            font-bold
            text-white
          "
          >
            Employee Leave
            Portal
          </h1>

          <p
            className="
            text-zinc-500
            mt-2
          "
          >
            Sign in to continue
          </p>
        </div>

        {message && (
  <div
    className="
      mb-4
      rounded-xl
      border
      border-red-500/20
      bg-red-500/10
      p-4
      text-red-400
    "
  >
    {message}
  </div>
)}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label
              className="
              text-sm
              text-zinc-400
              block
              mb-2
            "
            >
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={
                handleChange
              }
              placeholder="Enter email"
              className="
                w-full
                px-4
                py-3
                rounded-xl
                bg-[#1a1f27]
                border
                border-white/10
                text-white
                outline-none
                focus:border-blue-500
              "
            />
          </div>

          <div>
            <label
              className="
              text-sm
              text-zinc-400
              block
              mb-2
            "
            >
              Password
            </label>

            <input
              type="password"
              name="password"
              value={
                formData.password
              }
              onChange={
                handleChange
              }
              placeholder="Enter password"
              className="
                w-full
                px-4
                py-3
                rounded-xl
                bg-[#1a1f27]
                border
                border-white/10
                text-white
                outline-none
                focus:border-blue-500
              "
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              py-3
              rounded-xl
              bg-blue-600
              hover:bg-blue-500
              text-white
              font-medium
              transition
            "
          >
            {loading
              ? "Signing In..."
              : "Login"}
          </button>
        </form>

        <div
          className="
          mt-8
          text-sm
          text-zinc-500
          text-center
        "
        >
          Employee Leave
          Management System
        </div>
      </div>
    </div>
  );
};

export default Login;