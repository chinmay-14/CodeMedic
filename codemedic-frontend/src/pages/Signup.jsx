import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

import toast from "react-hot-toast";

import logo from "../assets/logo.png";

function Signup() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    name: "",
    email: "",
    password: "",

  });

  const [loading, setLoading] =
    useState(false);

  /* HANDLE CHANGE */

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };

  /* HANDLE SUBMIT */

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response = await axios.post(

        '${import.meta.env.VITE_BACKEND_URL}/api/auth/signup',

        formData

      );

      localStorage.setItem(
        "codemedic-token",
        response.data.token
      );

      localStorage.setItem(
        "codemedic-user",
        JSON.stringify(response.data.user)
      );

      toast.success(
        "Signup successful!"
      );

      window.location.href="/login";

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Signup failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-5">

      <div className="w-full max-w-md bg-[#07111F] border border-[#111827] rounded-3xl p-8 shadow-2xl">

        {/* LOGO */}

        <div className="flex flex-col items-center mb-8">

          <img
            src={logo}
            alt="CodeMedic"
            className="w-20 h-20 rounded-2xl mb-4"
          />

          <h1 className="text-4xl font-bold text-white">

            Create Account

          </h1>

          <p className="text-gray-500 mt-3 text-center">

            Join CodeMedic AI and start debugging smarter.

          </p>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-[#020617] border border-[#1E293B] rounded-2xl px-5 py-4 text-white outline-none focus:border-cyan-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-[#020617] border border-[#1E293B] rounded-2xl px-5 py-4 text-white outline-none focus:border-cyan-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full bg-[#020617] border border-[#1E293B] rounded-2xl px-5 py-4 text-white outline-none focus:border-cyan-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#172554] hover:bg-[#1E3A8A] transition py-4 rounded-2xl font-semibold text-white"
          >

            {loading
              ? "Creating Account..."
              : "Sign Up"}

          </button>

        </form>

        {/* LOGIN */}

        <p className="text-center text-gray-500 mt-6">

          Already have an account?{" "}

          <Link
            to="/login"
            className="text-cyan-400 hover:underline"
          >

            Login

          </Link>

        </p>

      </div>

    </div>

  );

}

export default Signup;