import { useEffect, useState } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

function CommunityFeed() {
  const { user } = useAuth();

  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");

  const fetchPosts = async () => {
    try {
      const res = await API.get("/posts");
      setPosts(res.data.posts);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePost = async (e) => {
    e.preventDefault();

    if (!content.trim()) return;

    try {
      await API.post("/posts", { content });
      setContent("");
      fetchPosts();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/posts/${id}`);
      fetchPosts();
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (id) => {
    try {
      await API.put(`/posts/${id}`, {
        content: editContent,
      });

      setEditingId(null);
      setEditContent("");
      fetchPosts();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <h2 className="page-title">
          Community Feed
        </h2>

        <p className="page-subtitle">
            Share updates, opportunities and discussions with your alumni network.
        </p>

        {/* Create Post */}
        <div className="card border-0 shadow-lg rounded-4 mb-4">
          <div className="card-body p-4">
            <h5 className="fw-bold mb-3">Share something with the community</h5>

            <form onSubmit={handlePost}>
              <textarea
                className="form-control"
                rows="4"
                placeholder="Share updates, internship opportunities, achievements or ask for advice..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />

              <button className="btn btn-grad btn-lg w-100 mt-3">
                Share Post
              </button>
            </form>
          </div>
        </div>

        {/* No Posts */}
        {posts.length === 0 && (
          <div className="alert alert-info text-center">
            No posts yet. Be the first to post!
          </div>
        )}

        {/* Posts */}
        {posts.map((post) => {
          const avatarColor =
          post.author.role === "alumni"
            ? "bg-success"
            : post.author.role === "admin"
            ? "bg-dark"
            : "bg-primary";

          return (
            <div
              className="card border-0 shadow-lg rounded-4 mb-4"
              key={post._id}
            >
              <div className="card-body p-4">
                {/* User Info */}
                <div className="d-flex align-items-center mb-3">

                  <div className="d-flex flex-column">

  <h5
          className="mb-1"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "6px",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            fill="currentColor"
            viewBox="0 0 16 16"
            style={{ color: "#03282D" }}
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
            <path
              fillRule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
            />
          </svg>

          {post.author.name}
        </h5>

        <span
          className="badge align-self-start"
          style={{
            marginLeft: "36px",
            backgroundColor:
              post.author.role === "alumni"
                ? "#198754"
                : post.author.role === "admin"
                ? "#212529"
                : "#03282D",
            color: "#FFFFFF",
          }}
        >
          {post.author.role}
        </span>

      </div>
                </div>

                {/* Edit Mode */}
                {editingId === post._id ? (
                  <>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                    />

                    <div className="d-flex gap-2 mt-3">
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleUpdate(post._id)}
                      >
                        Save
                      </button>

                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => {
                          setEditingId(null);
                          setEditContent("");
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p
                      className="mt-3 fs-6"
                      style={{ whiteSpace: "pre-wrap", lineHeight: "1.7" }}
                    >
                      {post.content}
                    </p>

                    <small className="text-muted d-block mt-2">
                      🕒 {new Date(post.createdAt).toLocaleDateString()} •{" "}
                      {new Date(post.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </small>

                    {user.id === post.author._id && (
                      <div className="d-flex justify-content-end gap-2 mt-3">
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => {
                            setEditingId(post._id);
                            setEditContent(post.content);
                          }}
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(post._id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default CommunityFeed;