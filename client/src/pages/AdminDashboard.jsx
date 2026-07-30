import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [recentActivity, setRecentActivity] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const [
        statsRes,
        usersRes,
        opportunitiesRes,
        recentRes,
      ] = await Promise.all([
        api.get("/admin/dashboard"),
        api.get("/admin/users"),
        api.get("/admin/opportunities"),
        api.get("/admin/recent-activity"),
      ]);

      setStats(statsRes.data);
      setUsers(usersRes.data);
      setOpportunities(opportunitiesRes.data);
      setRecentActivity(recentRes.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/admin/users/${id}`);

      setUsers((prev) => prev.filter((user) => user._id !== id));

      alert("User deleted successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to delete user.");
    }
  };

  const deleteOpportunity = async (id) => {
    const confirmDelete = window.confirm("Delete this opportunity?");

    if (!confirmDelete) return;

    try {
      await api.delete(`/admin/opportunities/${id}`);

      setOpportunities((prev) =>
        prev.filter((item) => item._id !== id)
      );

      alert("Opportunity deleted successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to delete opportunity.");
    }
  };

  const editUser = (user) => {
    if (user.isSuperAdmin) {
      alert("The Super Administrator cannot be modified.");
      return;
    }

    setEditingUser(user);
    setEditModalOpen(true);
  };

  const handleUpdateUser = async () => {
    try {
      await api.put(`/admin/users/${editingUser._id}`, editingUser);

      setUsers((prev) =>
        prev.map((u) => (u._id === editingUser._id ? editingUser : u))
      );

      alert("User updated successfully.");
      setEditModalOpen(false);
      setEditingUser(null);
    } catch (error) {
      console.error(error);
      alert("Failed to update user.");
    }
  };

  // Filter users by search term
  const filteredUsers = users.filter((user) =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container mt-5 text-center">
          <div
            className="spinner-border text-primary"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
          <h4 className="mt-3">Loading Admin Dashboard...</h4>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        {/* Dashboard Header */}
        <div className="d-flex justify-content-between align-items-center mb-5">
          <div>
            <h2
              className="fw-bold text-white d-flex align-items-center"
              style={{ fontSize: "2.3rem" }}
            >
              <i
                className="bi bi-person-gear me-3"
                style={{ fontSize: "2.2rem" }}
              ></i>
              Admin Dashboard
            </h2>

            <p
              className="text-white"
              style={{
                opacity: 0.85,
                fontSize: "1.1rem",
              }}
            >
              Manage users, community posts, opportunities, and platform activity.
            </p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="row">
          <div className="col-md-4 mb-3">
            <div
              className="shadow-sm rounded-4 p-4 h-100"
              style={{
                background: "#fff",
                color: "#03282D",
              }}
            >
              <h5
                className="fw-semibold"
                style={{ color: "#03282D" }}
              >
                Total Users
              </h5>
              <h1
                className="fw-bold"
                style={{ color: "#03282D" }}
              >
                {stats.totalUsers || 0}
              </h1>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div
              className="shadow-sm rounded-4 p-4 h-100"
              style={{
                background: "#fff",
                color: "#03282D",
              }}
            >
              <h5
                className="fw-semibold"
                style={{ color: "#03282D" }}
              >
                Students
              </h5>
              <h1
                className="fw-bold"
                style={{ color: "#03282D" }}
              >
                {stats.totalStudents || 0}
              </h1>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div
              className="shadow-sm rounded-4 p-4 h-100"
              style={{
                background: "#fff",
                color: "#03282D",
              }}
            >
              <h5
                className="fw-semibold"
                style={{ color: "#03282D" }}
              >
                Alumni
              </h5>
              <h1
                className="fw-bold"
                style={{ color: "#03282D" }}
              >
                {stats.totalAlumni || 0}
              </h1>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div
              className="shadow-sm rounded-4 p-4 h-100"
              style={{
                background: "#fff",
                color: "#03282D",
              }}
            >
              <h5
                className="fw-semibold"
                style={{ color: "#03282D" }}
              >
                Posts
              </h5>
              <h1
                className="fw-bold"
                style={{ color: "#03282D" }}
              >
                {stats.totalPosts || 0}
              </h1>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div
              className="shadow-sm rounded-4 p-4 h-100"
              style={{
                background: "#fff",
                color: "#03282D",
              }}
            >
              <h5
                className="fw-semibold"
                style={{ color: "#03282D" }}
              >
                Opportunities
              </h5>
              <h1
                className="fw-bold"
                style={{ color: "#03282D" }}
              >
                {stats.totalOpportunities || 0}
              </h1>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div
              className="shadow-sm rounded-4 p-4 h-100"
              style={{
                background: "#fff",
                color: "#03282D",
              }}
            >
              <h5
                className="fw-semibold"
                style={{ color: "#03282D" }}
              >
                Admins
              </h5>
              <h1
                className="fw-bold"
                style={{ color: "#03282D" }}
              >
                {stats.totalAdmins || 0}
              </h1>
            </div>
          </div>
        </div>

        <hr className="my-5" />

        {/* Registered Users */}
        <h3
          className="fw-bold text-white mb-3"
          style={{ fontSize: "2rem" }}
        >
          Registered Users
        </h3>

        <div className="input-group mb-3 shadow-sm">
          <span
            className="input-group-text border-0"
            style={{
              background: "#fff",
              color: "#03282D",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
          </span>

          <input
            type="text"
            className="form-control border-0"
            placeholder="Search users by name, email, role, or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "14px",
              boxShadow: "none",
            }}
          />
        </div>

        <div className="table-responsive">
          <table
            className="table table-hover align-middle"
            style={{
              background: "#fff",
              borderRadius: "15px",
              overflow: "hidden",
            }}
          >
            <thead
              style={{
                background: "#03282D",
                color: "white",
              }}
            >
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Company</th>
                <th width="180">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    No users found.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.company || "-"}</td>
                    <td>
                      {user.role !== "Admin" ? (
                        <>
                          <button
                            className="btn btn-sm me-2"
                            onClick={() => editUser(user)}
                            style={{
                              background: "#fff",
                              color: "#03282D",
                              border: "2px solid #03282D",
                              fontWeight: "600",
                            }}
                          >
                            Edit
                          </button>

                          <button
                            className="btn btn-sm"
                            onClick={() => deleteUser(user._id)}
                            style={{
                              background: "#03282D",
                              color: "#fff",
                              border: "none",
                              fontWeight: "600",
                            }}
                          >
                            <i className="bi bi-trash"></i> Delete
                          </button>
                        </>
                      ) : (
                        <span
                          className="badge rounded-pill"
                          style={{
                            background: "#03282D",
                            color: "#fff",
                            padding: "8px 14px",
                          }}
                        >
                          Protected
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <hr className="my-5" />

        {/* Recent Opportunities */}
        <h3
          className="fw-bold text-white mb-3"
          style={{ fontSize: "2rem" }}
        >
          Recent Opportunities
        </h3>

        <div className="table-responsive">
          <table
            className="table table-hover align-middle"
            style={{
              background: "#fff",
              borderRadius: "15px",
              overflow: "hidden",
            }}
          >
            <thead
              style={{
                background: "#03282D",
                color: "white",
              }}
            >
              <tr>
                <th>Title</th>
                <th>Company</th>
                <th>Location</th>
                <th>Deadline</th>
                <th>Posted By</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {opportunities.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    No Opportunities Found
                  </td>
                </tr>
              ) : (
                opportunities.map((item) => (
                  <tr key={item._id}>
                    <td>{item.title}</td>
                    <td>{item.company}</td>
                    <td>{item.location || "-"}</td>
                    <td>{item.deadline || "-"}</td>
                    <td>{item.postedBy?.name}</td>
                    <td>
                      <button
                        className="btn btn-sm"
                        onClick={() => deleteOpportunity(item._id)}
                        style={{
                          background: "#03282D",
                          color: "#fff",
                          border: "none",
                          fontWeight: "600",
                        }}
                      >
                        <i className="bi bi-trash"></i> Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <hr className="my-5" />

        {/* Recent Activity */}
        <h3
          className="fw-bold text-white mb-3"
          style={{ fontSize: "2rem" }}
        >
          Recent Activity
        </h3>

        <div className="row">
          <div className="col-md-4">
            <div className="card shadow">
              <div className="card-body">
                <h5>Latest Users</h5>
                <ul className="list-group list-group-flush">
                  {recentActivity.recentUsers?.length > 0 ? (
                    recentActivity.recentUsers.map((u) => (
                      <li className="list-group-item" key={u._id}>
                        {u.name}
                      </li>
                    ))
                  ) : (
                    <li className="list-group-item">No recent users</li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow">
              <div className="card-body">
                <h5>Latest Opportunities</h5>
                <ul className="list-group list-group-flush">
                  {recentActivity.recentOpportunities?.length > 0 ? (
                    recentActivity.recentOpportunities.map((o) => (
                      <li className="list-group-item" key={o._id}>
                        {o.title}
                      </li>
                    ))
                  ) : (
                    <li className="list-group-item">No recent opportunities</li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow">
              <div className="card-body">
                <h5>Latest Posts</h5>
                <ul className="list-group list-group-flush">
                  {recentActivity.recentPosts?.length > 0 ? (
                    recentActivity.recentPosts.map((p) => (
                      <li className="list-group-item" key={p._id}>
                        {p.title || p.content?.substring(0, 40)}...
                      </li>
                    ))
                  ) : (
                    <li className="list-group-item">No recent posts</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit User Modal */}
      {editModalOpen && editingUser && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit User</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setEditModalOpen(false);
                    setEditingUser(null);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editingUser.name}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, name: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={editingUser.email}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, email: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Role</label>
                  <select
                    className="form-select"
                    value={editingUser.role}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, role: e.target.value })
                    }
                  >
                    <option value="Student">Student</option>
                    <option value="Alumni">Alumni</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Company</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editingUser.company || ""}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        company: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="isSuperAdmin"
                    checked={editingUser.isSuperAdmin || false}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        isSuperAdmin: e.target.checked,
                      })
                    }
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setEditModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUpdateUser}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboard;