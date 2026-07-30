import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";
import "./Messages.css";

function Messages() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await API.get("/messages/contacts");

      console.log("Contacts:", res.data.contacts);

      setUsers(res.data.contacts);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <h2 className="page-title">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="34"
            fill="currentColor"
            className="page-icon me-3"
            viewBox="0 0 16 16"
          >
            <path d="M2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
          </svg>

          My Mentors
        </h2>

        <p
          style={{
            color: "rgba(255,255,255,.9)",
            fontSize: "1.05rem",
            marginBottom: "30px",
          }}
        >
          Conversations with your accepted mentorship connections.
        </p>

        {users.length === 0 ? (
          <div className="alert alert-info">
            No conversations available yet.
          </div>
        ) : (
          users.map((user) => (
            <div
              key={user._id}
              className="card border-0 shadow-lg rounded-4 mb-4"
            >
              <div className="card-body d-flex justify-content-between align-items-center p-4">
                <div className="d-flex align-items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="54"
                    height="54"
                    fill="#03282D"
                    viewBox="0 0 16 16"
                    style={{ marginRight: "18px" }}
                  >
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    <path
                      fillRule="evenodd"
                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                    />
                  </svg>

                  <div>
                    <div className="d-flex align-items-center">
                      <h4
                        className="mb-1 me-2"
                        style={{
                          fontWeight: "600",
                          color: "#03282D",
                        }}
                      >
                        {user.name}
                      </h4>

                      {user.unreadCount > 0 && (
                        <span
                          style={{
                            color: "#03282D",
                            fontWeight: "700",
                            fontSize: "16px",
                            marginLeft: "8px",
                          }}
                        >
                          ({user.unreadCount})
                        </span>
                      )}
                    </div>

                    <p
                      className="mb-0"
                      style={{
                        color: "#64748B",
                        fontSize: "16px",
                      }}
                    >
                      {user.email}
                    </p>
                  </div>
                </div>

                <button
                  className="btn btn-grad px-4"
                  onClick={() => navigate(`/chat/${user._id}`)}
                >
                  Open Chat
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Messages;