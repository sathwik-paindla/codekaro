
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  //gets user details
  //if there is no user navigate to login page
  if (!user) 
    return <Navigate to="/login" replace />;
  //else return children prop i.e.component passed
  return children;
}
