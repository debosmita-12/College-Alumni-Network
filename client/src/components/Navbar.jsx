import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
      <div className="container">

        <Link className="navbar-brand fw-bold" to="/dashboard">
          🎓 Alumni Networking Platform
        </Link>

        <div className="ms-auto d-flex align-items-center">

          <span className="text-white me-3">
            Welcome, {user?.name}
          </span>

          <button
            className="btn btn-light"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;