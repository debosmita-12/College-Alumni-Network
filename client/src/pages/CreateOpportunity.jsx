import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";
import "./CreateOpportunity.css";

function CreateOpportunity() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    company: "",
    description: "",
    type: "Internship",
    location: "",
    deadline: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/opportunities", form);

      alert("Opportunity posted successfully!");

      navigate("/opportunities");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to post opportunity."
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="container create-opportunity-container">

        {/* Heading */}

<div
  style={{
    width: "760px",
    margin: "0 auto 30px auto",
  }}
>
  <h2 className="page-title d-flex align-items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="38"
      height="38"
      fill="currentColor"
      className="me-3"
      viewBox="0 0 16 16"
    >
      <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v1.384l7.614 2.03a1.5 1.5 0 0 0 .772 0L16 5.884V4.5A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5" />
      <path d="M0 12.5A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5V6.85L8.129 8.947a.5.5 0 0 1-.258 0L0 6.85z" />
    </svg>

    Post a New Opportunity
  </h2>

  <p
    className="page-subtitle"
    style={{
      marginLeft: "56px",
    }}
  >
    Share internships, jobs and career opportunities with students and alumni.
  </p>
</div>

        {/* Card */}

        <div className="card create-card">

          <div className="card-body">

            <form onSubmit={handleSubmit}>

              <div className="mb-4">
                <label className="form-label">Title</label>

                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Company</label>

                <input
                  type="text"
                  className="form-control"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label">
                  Opportunity Type
                </label>

                <select
                  className="form-select"
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                >
                  <option>Internship</option>
                  <option>Full-Time Job</option>
                  <option>Part-Time Job</option>
                  <option>Remote</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="form-label">Location</label>

                <input
                  type="text"
                  className="form-control"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label">
                  Application Deadline
                </label>

                <input
                  type="date"
                  className="form-control"
                  name="deadline"
                  value={form.deadline}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label">
                  Description
                </label>

                <textarea
                  rows="6"
                  className="form-control"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-grad w-100"
              >
                 Post Opportunity
              </button>

            </form>

          </div>

        </div>

      </div>
    </>
  );
}

export default CreateOpportunity;