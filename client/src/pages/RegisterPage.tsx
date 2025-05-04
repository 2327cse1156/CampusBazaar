import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    collegeId: "",
    email: "",
    password: "",
    college: "",
    avatarUrl: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("campusbazaar-users") || "[]");

    const emailExists = users.some((u: any) => u.email === formData.email);
    if (emailExists) {
      toast.error("Email already registered.");
      return;
    }

    const newUser = {
      id: Date.now(),
      name: formData.fullName,
      email: formData.email,
      password: formData.password, // needed for login
      college: formData.college,
      collegeId: formData.collegeId,
      avatarUrl: formData.avatarUrl,
      isAdmin: false,
    };

    users.push(newUser);
    localStorage.setItem("campusbazaar-users", JSON.stringify(users));

    toast.success("Account created! Please login.");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link
          to="/"
          className="flex items-center justify-center text-emerald-600 mb-5"
        >
          <ShoppingBag className="h-10 w-10" />
        </Link>
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Join CampusBazaar
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Create an account to start buying and selling
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white py-8 px-6 shadow rounded-lg"
        >
          <div className="space-y-4">
            <input
              name="fullName"
              type="text"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md"
            />
            <input
              name="collegeId"
              type="text"
              placeholder="College ID Number"
              value={formData.collegeId}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md"
            />
            <input
              name="college"
              type="text"
              placeholder="College Name"
              value={formData.college}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md"
            />
            <input
              name="avatarUrl"
              type="text"
              placeholder="Avatar URL (optional)"
              value={formData.avatarUrl}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-md transition"
          >
            Register
          </button>

          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-emerald-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
