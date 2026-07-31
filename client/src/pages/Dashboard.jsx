import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api";
import "./Dashboard.css";

import {
  BsPeopleFill,
  BsPersonCheckFill,
  BsBriefcaseFill,
  BsChatDotsFill,
  BsPersonRaisedHand,
} from "react-icons/bs";

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalAlumni: 0,
    totalUsers: 0,
    opportunities: 0,
    unreadMessages: 0,
    totalPosts: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {

        const { data } = await API.get("/dashboard/stats");

        console.log("API Response:", data);
        setStats(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();
  }, []);

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <div className="welcome-card">
          <div className="welcome-content">
            <h5 className="welcome-time">
              <BsPersonRaisedHand className="welcome-icon" />
              Welcome Back
            </h5>

            <h1>{user?.name}</h1>

            <p>
              {user?.role === "Student"
                ? "Connect with alumni, explore opportunities and build your professional network."
                : "Support students, share opportunities and strengthen the alumni community."}
            </p>
          </div>
        </div>

        <div className="row mt-2 g-4">
          <div className="col-lg-3 col-md-6">
            <div className="stats-card">
              <BsPeopleFill className="stats-icon" size={65} />
              <h2>{stats.totalAlumni || 0}</h2>
              <p>Registered Alumni</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="stats-card">
              <BsPeopleFill className="stats-icon" size={65} />
              <h2>{stats.totalUsers || 0}</h2>
              <p>Total Users</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="stats-card">
              <BsBriefcaseFill className="stats-icon" size={65} />
              <h2>{stats.opportunities || 0}</h2>
              <p>
                {user?.role === "Student"
                  ? "Opportunities"
                  : "Posted Opportunities"}
              </p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="stats-card">
              <BsChatDotsFill className="stats-icon" size={65} />

              {user?.role === "Admin" ? (
                <>
                  <h2>{stats.totalPosts || 0}</h2>
                  <p>Community Posts</p>
                </>
              ) : (
                <>
                  <h2>{stats.unreadMessages || 0}</h2>
                  <p>Unread Messages</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;