import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import "./MyRequests.css";

function MyRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await API.get("/mentorship/my-requests");
      setRequests(res.data.requests);
    } catch (err) {
      console.error(err);
      alert("Failed to load requests");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <h2 className="page-title"> 
            <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      fill="currentColor"
      className="page-icon"
      viewBox="0 0 16 16"
    >
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
    </svg>
    My Mentorship Requests
    </h2>

        {requests.length === 0 ? (
          <p>You haven't sent any mentorship requests yet.</p>
        ) : (
          requests.map((request) => (
            <div className="card request-card mb-4" key={request._id}>
              <div className="card-body">
                <h5>{request.alumni?.name}</h5>

                <p>
                  <strong>Email:</strong> {request.alumni?.email}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  {request.status === "Accepted" && (
                    <span className="badge bg-success">Accepted</span>
                  )}

                  {request.status === "Rejected" && (
                    <span className="badge bg-danger">Rejected</span>
                  )}

                  {request.status === "Pending" && (
                    <span className="badge bg-warning text-dark">
                      Pending
                    </span>
                  )}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default MyRequests;