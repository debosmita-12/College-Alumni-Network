import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
  BsHouseFill,
  BsMortarboardFill,
  BsPeopleFill,
  BsChatSquareFill,
  BsBriefcaseFill,
  BsPersonCircle,
  BsPersonFill,
  BsPersonGear,
} from "react-icons/bs";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path) =>
    location.pathname === path ? "nav-link active fw-bold" : "nav-link";

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark shadow-sm sticky-top"
      style={{ backgroundColor: "#03282D" }}
    >
      <div className="container-fluid px-3">
        {/* Logo */}
        <Link
          className="navbar-brand fw-bold d-flex align-items-center"
          to="/dashboard"
          style={{
            fontSize: "1.7rem",
            marginRight: "45px",
          }}
        >
          <BsMortarboardFill
            size={30}
            className="me-2"
            style={{ color: "white" }}
          />
          Alumni Nexus
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Navigation */}
          <ul
            className="navbar-nav me-auto"
            style={{
              gap: "2px",
              marginLeft: "40px",
            }}
          >
            <li className="nav-item">
              <Link className={isActive("/dashboard")} to="/dashboard">
                <BsHouseFill className="me-1" />
                Dashboard
              </Link>
            </li>

            <li className="nav-item">
              <Link className={isActive("/alumni")} to="/alumni">
                <BsMortarboardFill className="me-1" />
                Alumni
              </Link>
            </li>

            {user?.role !== "Admin" && (
  <li className="nav-item">
    <Link
      className={
        user?.role === "Student"
          ? isActive("/my-requests")
          : isActive("/mentorship")
      }
      to={user?.role === "Student" ? "/my-requests" : "/mentorship"}
    >
      <BsPersonFill className="me-1" />
      Mentorship
    </Link>
  </li>
)}

            <li className="nav-item">
              <Link className={isActive("/community")} to="/community">
                <BsPeopleFill className="me-1" />
                Community
              </Link>
            </li>

            {user?.role !== "Admin" && (
              <li className="nav-item">
                <Link className={isActive("/messages")} to="/messages">
                  <BsChatSquareFill className="me-1" />
                  Messages
                </Link>
              </li>
            )}

            <li className="nav-item">
              <Link className={isActive("/opportunities")} to="/opportunities">
                <BsBriefcaseFill className="me-1"  />
                Opportunities
              </Link>
            </li>

            {user?.role !== "Admin" && (
              <li className="nav-item">
                <Link className={isActive("/profile")} to="/profile">
                  <BsPersonCircle className="me-1" />
                  Profile
                </Link>
              </li>
            )}

            {user?.role === "Admin" && (
  <li className="nav-item">
    <Link className={isActive("/admin")} to="/admin">
      <BsPersonGear className="me-1" />
      Admin Panel
    </Link>
  </li>
)}
          </ul>

          {/* Right Side */}
          <div className="d-flex align-items-center">
            <span
              className="badge bg-light text-dark rounded-pill me-2"
              style={{
                padding: "8px 12px",
                fontSize: "13px",
              }}
            >
              <BsPersonCircle className="me-1" />
              {user?.name?.split(" ")[0]}
            </span>

            <button
              className="btn btn-outline-light btn-sm"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;