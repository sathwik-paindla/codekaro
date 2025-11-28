import { BrowserRouter as Router, Routes, Route, Navigate, BrowserRouter} from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Layout from "./components/Layout";



export default function App() {
return (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

    </Routes>
    </Layout>
   
  </BrowserRouter>
  
);
}

