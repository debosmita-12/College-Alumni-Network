import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import API from "../services/api";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();
  const { updateUser } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    skills: "",
    industry: "",
    experience: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/users/profile");

      setFormData({
        name: res.data.name || "",
        skills: Array.isArray(res.data.skills)
          ? res.data.skills.join(", ")
          : "",
        industry: res.data.industry || "",
        experience: res.data.experience ?? 0,
      });
    } catch (err) {
      console.error(err);
      alert("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedData = {
        ...formData,
        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
        experience: Number(formData.experience) || 0,
      };

      const res = await API.put("/users/profile", updatedData);

      updateUser(res.data.user);

      alert(res.data.message);

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="container mt-5 text-center">
          <div
            className="spinner-border"
            style={{ color: "#03282D" }}
          ></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        {/* Page Heading */}

        <h2 className="page-title">

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            fill="currentColor"
            className="page-icon"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />

            <path
              fillRule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
            />
          </svg>

          My Profile

        </h2>

        <p className="page-subtitle">
          Update your professional information.
        </p>

        {/* Profile Card */}

        <div className="card profile-card border-0">

          <div className="card-body">

            <form onSubmit={handleSubmit}>

              <div className="mb-3">

                <label className="form-label profile-label">
                  Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />

              </div>

              <div className="mb-3">

                <label className="form-label profile-label">
                  Skills
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="React, Node.js, MongoDB"
                />

              </div>

              <div className="mb-3">

                <label className="form-label profile-label">
                  Industry
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                />

              </div>

              <div className="mb-3">

                <label className="form-label profile-label">
                  Experience (Years)
                </label>

                <input
                  type="number"
                  min="0"
                  className="form-control"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                />

              </div>

              <button
                type="submit"
                className="btn btn-grad w-100 profile-save-btn"
              >
                Save Changes
              </button>

            </form>

          </div>

        </div>

      </div>
    </>
  );
}

export default Profile;