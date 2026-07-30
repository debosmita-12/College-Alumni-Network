import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import api from "../services/api";
import "./Opportunities.css";

const Opportunities = () => {
  const { user } = useAuth();

  const [opportunities, setOpportunities] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchOpportunities = async () => {
    try {
      const res = await api.get("/opportunities");
      setOpportunities(res.data.opportunities);
    } catch (err) {
      console.error(err);
      alert("Failed to load opportunities.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const filtered = opportunities.filter((item) => {
    const keyword = search.toLowerCase();

    return (
      item.title?.toLowerCase().includes(keyword) ||
      item.company?.toLowerCase().includes(keyword) ||
      item.location?.toLowerCase().includes(keyword)
    );
  });

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>

            <h2 className="page-title">
              Career Opportunities
            </h2>

            <p className="page-subtitle">
              Discover internships, jobs and career opportunities shared by alumni.
            </p>

          </div>

          {(user?.role === "Alumni" || user?.role === "Admin") && (
            <Link
              to="/create-opportunity"
              className="btn btn-grad px-4"
            >
              Post Opportunity
            </Link>
          )}

        </div>

        <div className="search-box">

          <span className="search-icon">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
            </svg>

          </span>

          <input
            type="text"
            placeholder="Search by title, company or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        {loading ? (
          <h5 className="text-white">Loading...</h5>
        ) : filtered.length === 0 ? (
          <div className="alert alert-info">
            No opportunities found.
          </div>
        ) : (
          <div className="row">

            {filtered.map((item) => (

              <div className="col-md-6 mb-4" key={item._id}>

                <div className="opportunity-card">

                  <h3 className="opportunity-title">
                    {item.title}
                  </h3>

                  <div className="opportunity-company">
                    {item.company}
                  </div>

                  <p>
                    <strong>Type:</strong> {item.type}
                  </p>

                  <p>
                    <strong>Location:</strong> {item.location}
                  </p>

                  <p>
                    {item.description}
                  </p>

                  <p>
                    <strong>Deadline:</strong>{" "}
                    {item.deadline
                      ? new Date(item.deadline).toLocaleDateString()
                      : "N/A"}
                  </p>

                  <div className="posted-by">

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      style={{ color: "#03282D" }}
                    >
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>

                      <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
                    </svg>

                    <span>Posted by</span>

                    <strong>{item.postedBy?.name || "Unknown"}</strong>

                  </div>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>

    </>
  );
};

export default Opportunities;