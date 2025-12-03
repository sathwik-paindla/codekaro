import { BrowserRouter as Router, Routes, Route, Navigate, BrowserRouter} from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Layout from "./components/Layout";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import ProblemsList from "./pages/ProblemList";
import ProblemDetails from "./pages/ProblemDetails";
import AddProblem from "./pages/AddProblem";
import ProblemSubmissions from "./pages/ProblemSubmissions";
import UserSubmissions from "./pages/UserSubmissions";
import SingleSubmission from "./pages/SingleSubmission";



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

          <Route path="/problems/:id"
        element={
          <ProtectedRoute>
            <ProblemDetails/>
          </ProtectedRoute>
          }/>

          <Route path="/problems/add"
        element={
          <ProtectedRoute>
            <AddProblem/>
          </ProtectedRoute>
          }/>

          <Route path="/problems/:id/submissions"
        element={
          <ProtectedRoute>
            <ProblemSubmissions/>
          </ProtectedRoute>
          }/>

          <Route path="/submissions"
        element={
          <ProtectedRoute>
            <UserSubmissions/>
          </ProtectedRoute>
          }/>

          <Route path="/submission/:id"
        element={
          <ProtectedRoute>
            <SingleSubmission/>
          </ProtectedRoute>
          }/>



        </Route>
  
    </Routes>
   
  </BrowserRouter>
  
);
}

