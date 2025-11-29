import { BrowserRouter as Router, Routes, Route, Navigate, BrowserRouter} from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Layout from "./components/Layout";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import ProblemsList from "./pages/ProblemList";



export default function App() {
  const {user}=useAuth();
return (
  
  <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<Navigate to="/problems" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<Layout/>}>

        <Route path="/" element={
          <>
          <h1 className="text-center mt-6 text-gray-600">Welcome,{user?.email}</h1>
            </>
          } />

          <Route path="/problems"
        element={
          <ProtectedRoute>
            <>
          <h1 className="text-center mt-6 text-gray-600">Welcome,{user?.email}</h1>
            </>
            <ProblemsList/>
          </ProtectedRoute>
        }/>

        </Route>

        

        

    </Routes>
   
  </BrowserRouter>
  
);
}

