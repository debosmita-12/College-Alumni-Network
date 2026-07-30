import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import "./MentorshipRequests.css";

function MentorshipRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await API.get("/mentorship/received");
      setRequests(res.data.requests);
    } catch (err) {
      console.error(err);
      alert("Failed to load mentorship requests");
    }
  };

  const acceptRequest = async (id) => {
    try {
      await API.patch(`/mentorship/accept/${id}`);
      fetchRequests();
    } catch (err) {
      console.error(err);
      alert("Failed to accept request");
    }
  };

  const rejectRequest = async (id) => {
    try {
      await API.patch(`/mentorship/reject/${id}`);
      fetchRequests();
    } catch (err) {
      console.error(err);
      alert("Failed to reject request");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        {/* Heading */}

        <h2 className="page-title">

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="38"
            height="38"
            fill="currentColor"
            className="page-icon"
            viewBox="0 0 16 16"
          >
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
          </svg>

          Mentorship Requests

        </h2>

        <p className="page-subtitle">
          Review and manage mentorship requests from students.
        </p>

        {requests.length === 0 ? (

          <p className="page-subtitle">
            No mentorship requests found.
          </p>

        ) : (

          requests.map((request) => (

            <div
              className="request-card mb-4"
              key={request._id}
            >

              <h4>
                {request.student?.name}
              </h4>

              <p>

                <strong>Email:</strong>{" "}
                {request.student?.email}

              </p>

              <p>

                <strong>Message:</strong>{" "}
                {request.message}

              </p>

              <p>

                <strong>Status:</strong>{" "}
                {request.status}

              </p>

              <div className="request-actions">

                <button
                  className="btn accept-btn"
                  disabled={request.status !== "Pending"}
                  onClick={() =>
                    acceptRequest(request._id)
                  }
                >
                  Accept
                </button>

                <button
                  className="btn btn-danger reject-btn"
                  disabled={request.status !== "Pending"}
                  onClick={() =>
                    rejectRequest(request._id)
                  }
                >
                  Reject
                </button>

              </div>

            </div>

          ))

        )}

      </div>
    </>
  );
}

export default MentorshipRequests;