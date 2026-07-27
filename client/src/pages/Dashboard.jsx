import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
    const cards = [
    {
        title: "Alumni Directory",
        icon: "🎓",
        color: "primary",
        route: "/alumni",
    },
    {
    title: "Mentorship",
    icon: "🤝",
    color: "success",
    route: "/mentorship",
    },
    {
        title: "Community Feed",
        icon: "💬",
        color: "warning",
        route: "#",
    },
    {
        title: "Messages",
        icon: "✉️",
        color: "info",
        route: "#",
    },
    ];
  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <h2>
          Welcome, {user?.name} 👋
        </h2>

        <p className="text-muted">
          Manage your alumni connections from one place.
        </p>

        <div className="row mt-4">

          {cards.map((card, index) => (

            <div className="col-md-6 col-lg-3 mb-4" key={index}>

              <div
                className={`card border-${card.color} shadow h-100`}
                style={{ cursor: "pointer" }}
                onClick={() => {
                    if (card.route !== "#") {
                    navigate(card.route);
                    }
                }}
                >

                <div className="card-body text-center">

                  <h1>{card.icon}</h1>

                  <h5>{card.title}</h5>

                </div>

              </div>

            </div>

          ))}

        </div>

        <div className="card shadow mt-4">

          <div className="card-header bg-dark text-white">
            Your Profile
          </div>

          <div className="card-body">

            <p><strong>Name:</strong> {user?.name}</p>

            <p><strong>Email:</strong> {user?.email}</p>

            <p><strong>Role:</strong> {user?.role}</p>

            <p><strong>Skills:</strong> {user?.skills || "Not Added"}</p>

            <p><strong>Industry:</strong> {user?.industry || "Not Added"}</p>

            <p><strong>Experience:</strong> {user?.experience || "Not Added"}</p>

          </div>

        </div>

      </div>
    </>
  );
}

export default Dashboard;