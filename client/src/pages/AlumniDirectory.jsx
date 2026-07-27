import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function AlumniDirectory() {
  const [alumni, setAlumni] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchAlumni();
  }, []);

 const fetchAlumni = async () => {
  try {
    const res = await API.get("/users/alumni");

    console.log(res.data);

    setAlumni(res.data.alumni);
  } catch (err) {
    console.error(err);
  }
  };
  const sendMentorshipRequest = async (receiverId) => {
  try {
    console.log("Receiver ID:", receiverId);

    const res = await API.post("/mentorship/request", {
    alumniId: receiverId,
    message: "I would like to request mentorship.",
    });

    console.log("Response:", res.data);

    alert(res.data.message);

  } catch (err) {
    console.error(err.response?.data || err);

    alert(err.response?.data?.message || "Failed to send request");
  }
};
  const filteredAlumni = alumni.filter((person) => {
    const query = search.toLowerCase();

    return (
      person.name?.toLowerCase().includes(query) ||
      person.industry?.toLowerCase().includes(query) ||
      person.skills?.toLowerCase().includes(query)
    );
  });

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <h2>🎓 Alumni Directory</h2>

        <input
          className="form-control my-4"
          placeholder="Search by name, skills or industry..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="row">

          {filteredAlumni.map((alumni) => (

            <div className="col-md-6 col-lg-4 mb-4" key={alumni._id}>

              <div className="card shadow h-100">

                <div className="card-body">

                  <h4>{alumni.name}</h4>

                  <hr />

                  <p><strong>Email:</strong> {alumni.email}</p>

                  <p><strong>Industry:</strong> {alumni.industry || "N/A"}</p>

                  <p><strong>Skills:</strong> {alumni.skills || "N/A"}</p>

                  <p><strong>Experience:</strong> {alumni.experience || "N/A"}</p>
                  <button
                    className="btn btn-success w-100 mt-3"
                    onClick={() => sendMentorshipRequest(alumni._id)}
                  >
                    Send Mentorship Request
                    </button>
                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
    </>
  );
}

export default AlumniDirectory;