import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Register.css";
import { BsCheckCircleFill } from "react-icons/bs";
function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Student",
    skills: "",
    industry: "",
    experience: 0,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === "experience"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const { confirmPassword, ...registerData } = formData;

    try {
      setLoading(true);

      await API.post("/auth/register", registerData);

      alert("Registration successful! Please login with your credentials.");

      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid register-page min-vh-100 d-flex align-items-center justify-content-center py-5">
      <div
        className="row bg-white shadow-lg rounded-4 overflow-hidden register-card"
      >
        {/* Left Panel */}

        <div className="col-lg-5 register-left text-white p-5 d-flex flex-column justify-content-center">

          <h1 className="fw-bold mb-3">Alumni Platform</h1>

          <p className="lead">
            Join our alumni community and connect with students,
            mentors, professionals, and exciting career opportunities.
          </p>

          <hr />

          <ul className="list-unstyled mt-4">

            <li className="feature-item">
              <BsCheckCircleFill />
              Alumni Directory
          </li>

            <li className="feature-item">
              <BsCheckCircleFill />
              Mentorship Program
          </li>

            <li className="feature-item">
              <BsCheckCircleFill />
              Community discussions
          </li>

            <li className="feature-item">
              <BsCheckCircleFill />
              Career Opportunities
          </li>

          </ul>

        </div>

        {/* Right Panel */}

        <div className="col-lg-7 p-5">

          <h2 className="fw-bold text-center">Create Account</h2>

          <p className="text-center text-muted mb-4">
            Join the Alumni Networking Platform
          </p>

          <form onSubmit={handleSubmit}>

            <div className="mb-3">

              <label className="form-label fw-semibold">
                Full Name
              </label>

              <input
                type="text"
                className="form-control form-control-lg"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />

            </div>

            <div className="mb-3">

              <label className="form-label fw-semibold">
                Email Address
              </label>

              <input
                type="email"
                className="form-control form-control-lg"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>

            <div className="mb-3">

              <label className="form-label fw-semibold">
                Password
              </label>

              <input
                type="password"
                className="form-control form-control-lg"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />

            </div>

            <div className="mb-3">

              <label className="form-label fw-semibold">
                Confirm Password
              </label>

              <input
                type="password"
                className="form-control form-control-lg"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />

            </div>

            <div className="row">

              <div className="col-md-6 mb-3">

                <label className="form-label fw-semibold">
                  Role
                </label>

                <select
                  className="form-select form-select-lg"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option>Student</option>
                  <option>Alumni</option>
                </select>

              </div>

            </div>

            {formData.role === "Alumni" && (
              <>
                <div className="mb-3">

                  <label className="form-label fw-semibold">
                    Skills
                  </label>

                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="skills"
                    placeholder="React, Python, Java"
                    value={formData.skills}
                    onChange={handleChange}
                  />

                </div>

                <div className="mb-3">

                  <label className="form-label fw-semibold">
                    Industry
                  </label>

                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="industry"
                    placeholder="Software Development"
                    value={formData.industry}
                    onChange={handleChange}
                  />

                </div>

                <div className="mb-4">

                  <label className="form-label fw-semibold">
                    Experience (Years)
                  </label>

                  <input
                    type="number"
                    className="form-control form-control-lg"
                    name="experience"
                    min="0"
                    value={formData.experience}
                    onChange={handleChange}
                  />

                </div>
              </>
            )}

            <button
              className="btn btn-grad btn-lg w-100"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

          </form>

          <p className="text-center mt-4">
              Already have an account?
              <Link
                  to="/login"
                  className="register-login-link ms-2"
              >
                  Login
              </Link>
          </p>

        </div>

      </div>
    </div>
  );
}

export default Register;