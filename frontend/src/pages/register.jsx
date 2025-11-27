import React, { useState } from "react";
import { registerApi } from "../api/authApi";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerApi(form.firstname, form.lastname, form.email, form.password);
      alert("Registered successfully. Please login.");
      navigate("/login");
    } catch (err) {
      alert(err?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white shadow-lg p-6 rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="firstname" placeholder="First Name" className="w-full border p-2"
               value={form.firstname} onChange={handleChange} />
        <input name="lastname" placeholder="Last Name" className="w-full border p-2"
               value={form.lastname} onChange={handleChange} />
        <input name="email" placeholder="Email" className="w-full border p-2"
               value={form.email} onChange={handleChange} />
        <input name="password" placeholder="Password" type="password" className="w-full border p-2"
               value={form.password} onChange={handleChange} />
        <button className="w-full bg-green-600 text-white py-2 rounded">Register</button>
        <p className="text-center mt-6 text-gray-600">
            Already a user?
            <button
            onClick={() => navigate("/login")}
            className="text-indigo-600 font-medium ml-1 underline hover:text-indigo-800"
            >
            Login here
            </button>
        </p>
      </form>
    </div>
  );
}
