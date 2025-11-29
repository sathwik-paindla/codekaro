import { BrowserRouter as Router, Routes, Route, Navigate, BrowserRouter} from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Layout from "./components/Layout";
import { useAuth } from "./context/AuthContext";



export default function App() {
  const {user}=useAuth();
return (
  
  <BrowserRouter>
    
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Layout/>}>
        <Route path="/" element={
          <>
          <h1 className="text-center mt-6 text-gray-600">Welcome,{user?.email}</h1>
            </>
          } />
        </Route>

    </Routes>
   
  </BrowserRouter>
  
);
}

