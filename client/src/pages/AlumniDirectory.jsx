import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import "./AlumniDirectory.css";

function AlumniDirectory() {
  const { user } = useAuth();

  const [alumni, setAlumni] = useState([]);
  const [search, setSearch] = useState("");
  const [myRequests, setMyRequests] = useState([]);

  useEffect(() => {
    fetchAlumni();

    if (user?.role === "Student") {
      fetchMyRequests();
    }
  }, [user]);

  const fetchAlumni = async () => {
    try {
      const res = await API.get("/users/alumni");

      setAlumni(
        res.data.alumni.filter(
          (person) => person.role.toLowerCase() === "alumni"
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMyRequests = async () => {
    try {
      const res = await API.get("/mentorship/my-requests");
      setMyRequests(res.data.requests);
    } catch (err) {
      console.error(err);
    }
  };

  const sendMentorshipRequest = async (receiverId) => {
    try {
      const res = await API.post("/mentorship/request", {
        alumniId: receiverId,
        message: "I would like to request mentorship.",
      });

      alert(res.data.message);
      fetchMyRequests();
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Failed to send request."
      );
    }
  };

  const filteredAlumni = alumni.filter((person) => {
    const query = search.toLowerCase().trim();

    const skillsText = Array.isArray(person.skills)
      ? person.skills.join(" ").toLowerCase()
      : (person.skills || "").toLowerCase();

    return (
      (person.name || "").toLowerCase().includes(query) ||
      skillsText.includes(query) ||
      (person.industry || "").toLowerCase().includes(query)
    );
  });

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        {/* Heading */}

        <h2 className="page-title">

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="42"
            height="42"
            fill="currentColor"
            className="page-icon"
            viewBox="0 0 16 16"
          >
            <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917z" />

            <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466z" />
          </svg>

          Alumni Directory

        </h2>

        <p className="page-subtitle">
          Find alumni mentors based on their skills and industry.
        </p>

        {/* Search */}

        <div className="search-box">

          <span className="search-icon">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>

          </span>

          <input
            type="text"
            placeholder="Search by name, skills or industry..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        <div className="row">

          {filteredAlumni.map((alumni) => {

            const request = myRequests.find(
              (r) => r.alumni?._id === alumni._id
            );

            return (

              <div
                className="col-lg-4 col-md-6 mb-4"
                key={alumni._id}
              >

                <div className="alumni-card">

                  {/* Top */}

                  <div className="alumni-header">

                    <div className="alumni-avatar">

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="58"
                        height="58"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>

                        <path
                          fillRule="evenodd"
                          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                        />
                      </svg>

                    </div>

                    <div>

                      <h4 className="alumni-name">
                        {alumni.name}
                      </h4>

                      <span className="alumni-role">
                        Alumni
                      </span>

                    </div>

                  </div>

                  <hr />

                  <div className="alumni-info">

                    <p>
                      <strong>Email:</strong> {alumni.email}
                    </p>

                    <p>
                      <strong>Industry:</strong>{" "}
                      {alumni.industry || "N/A"}
                    </p>

                    <p>
                      <strong>Skills:</strong>{" "}
                      {Array.isArray(alumni.skills)
                        ? alumni.skills.join(", ")
                        : alumni.skills || "N/A"}
                    </p>

                    <p>
                      <strong>Experience:</strong>{" "}
                      {alumni.experience || "N/A"} Years
                    </p>

                  </div>

                  {user?.role === "Student" ? (

                    <button
                      className={`btn alumni-btn w-100 mt-3 ${
                        request
                          ? request.status === "Accepted"
                            ? "btn-success"
                            : request.status === "Rejected"
                            ? "btn-danger"
                            : "btn-secondary"
                          : ""
                      }`}
                      disabled={!!request}
                      onClick={() =>
                        sendMentorshipRequest(alumni._id)
                      }
                    >
                      {request
                      ? request.status === "Pending"
                        ? "Request Sent (Pending)"
                        : request.status === "Accepted"
                        ? "Request Accepted"
                        : "Request Rejected"
                      : "Send Mentorship Request"}
                    </button>

                  ) : (

                    <div className="alumni-profile-label">
                      Alumni Profile
                    </div>

                  )}

                </div>

              </div>

            );
          })}

        </div>

      </div>
    </>
  );
}

export default AlumniDirectory;