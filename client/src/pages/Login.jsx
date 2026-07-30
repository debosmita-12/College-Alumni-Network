// Login.jsx

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

function Login() {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const res = await API.post("/auth/login", formData);

      login(res.data.user, res.data.token);

      alert("Login Successful!");

      navigate("/dashboard");

    } catch (error) {

      alert(error.response?.data?.message || "Login Failed");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="container login-page">

      <div className="card login-card">

        <h2 className="fw-bold text-center mb-2">

          Welcome Back

        </h2>

        <p className="text-center text-muted mb-4">

          Sign in to your alumni account

        </p>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">

            <label className="form-label fw-semibold">

              Email Address

            </label>

            <input

              type="email"

              className="form-control form-control-lg"

              name="email"

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

          <button

            className="btn btn-grad btn-lg w-100"

            disabled={loading}

          >

            {loading ? "Logging in..." : "Login"}

          </button>

        </form>

        <p className="text-center mt-4">

          New here?

          <Link

            to="/register"

            className="login-register-link ms-2"

          >

            Register

          </Link>

        </p>

      </div>

    </div>

  );

}

export default Login;