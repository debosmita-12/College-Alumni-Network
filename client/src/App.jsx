import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AlumniDirectory from "./pages/AlumniDirectory";
import MentorshipRequests from "./pages/MentorshipRequests";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/alumni"
          element={
          <ProtectedRoute>
            <AlumniDirectory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/mentorship"
        element={
        <ProtectedRoute>
          <MentorshipRequests />
        </ProtectedRoute>
        }
      />
      </Routes>
    </BrowserRouter>
  );
}

export default App;