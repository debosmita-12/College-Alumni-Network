import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

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
        err.response?.data?.message || "Failed to post opportunity."
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4" style={{ maxWidth: "700px" }}>
        <div className="card shadow">
          <div className="card-header bg-primary text-white">
            <h3 className="mb-0">Post Opportunity</h3>
          </div>

          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
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

              <div className="mb-3">
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

              <div className="mb-3">
                <label className="form-label">Opportunity Type</label>
                <select
                  className="form-select"
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                >
                  <option>Internship</option>
                  <option>Job</option>
                </select>
              </div>

              <div className="mb-3">
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

              <div className="mb-3">
                <label className="form-label">Application Deadline</label>
                <input
                  type="date"
                  className="form-control"
                  name="deadline"
                  value={form.deadline}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  rows="5"
                  className="form-control"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <button className="btn btn-primary w-100">
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