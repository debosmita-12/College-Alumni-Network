import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

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

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <h2>🤝 Mentorship Requests</h2>

        {requests.length === 0 ? (
          <p>No mentorship requests found.</p>
        ) : (
          requests.map((request) => (
            <div className="card shadow mb-3" key={request._id}>
              <div className="card-body">
                <h5>{request.student?.name}</h5>

                <p>
                  <strong>Email:</strong> {request.student?.email}
                </p>

                <p>
                  <strong>Message:</strong> {request.message}
                </p>

                <p>
                  <strong>Status:</strong> {request.status}
                  <div className="mt-3">
                        <button
                            className="btn btn-success me-2"
                        >
                            Accept
                        </button>

                        <button
                            className="btn btn-danger"
                        >
                            Reject
                        </button>
                   </div>
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default MentorshipRequests;