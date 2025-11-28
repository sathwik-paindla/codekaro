import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold">
        <Link to="/">CodeKaro</Link>
      </div>

      <div className="flex items-center gap-4">
        <Link to="/problems" className="hover:text-gray-300">Problems</Link>
        {user ? (
          <>
            <Link to="/submissions" className="hover:text-gray-300">My Submissions</Link>
            <button onClick={handleLogout} className="bg-red-600 px-3 py-1 rounded">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-gray-300">Login</Link>
            <Link to="/register" className="bg-blue-600 px-3 py-1 rounded">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
