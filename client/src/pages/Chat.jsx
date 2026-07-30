import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import API from "../services/api";
import "./Chat.css";

function Chat() {
  const { userId } = useParams();
  const { user } = useAuth();

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const bottomRef = useRef(null);

  useEffect(() => {
    fetchConversation();
  }, [userId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const fetchConversation = async () => {
    try {
      const res = await API.get(`/messages/conversation/${userId}`);
      setMessages(res.data.messages);
    } catch (err) {
      console.error(err);
    }
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      await API.post("/messages/send", {
        receiver: userId,
        message,
      });

      setMessage("");
      fetchConversation();
    } catch (err) {
      console.error(err);
      alert("Failed to send message");
    }
  };

  const clearConversation = async () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear this conversation?"
    );

    if (!confirmClear) return;

    try {
      await API.delete(`/messages/conversation/${userId}`);

      setMessages([]);

      alert("Conversation cleared successfully.");
    } catch (err) {
      console.error(err);
      alert("Failed to clear conversation.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <div className="d-flex justify-content-between align-items-center mb-3">

          <h2 className="page-title">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="34"
              height="34"
              fill="currentColor"
              className="page-icon"
              viewBox="0 0 16 16"
            >
              <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9 9 0 0 0 8 15"/>
            </svg>

            Chat

          </h2>

          <button
            className="clear-chat-btn"
            onClick={clearConversation}
          >

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
            </svg>

            Clear Conversation

          </button>

        </div>

        <div className="chat-container">

          {messages.length === 0 ? (

            <div className="no-message">
              No messages yet.
            </div>

          ) : (

            messages.map((msg) => {

              const isMe =
                msg.sender._id === (user._id || user.id);

              return (

                <div
                  key={msg._id}
                  className={`message-row ${
                    isMe ? "sender-row" : "receiver-row"
                  }`}
                >

                  <div
                    className={`message-box ${
                      isMe
                        ? "sender-message"
                        : "receiver-message"
                    }`}
                  >

                    <div className="message-name">
                      {msg.sender.name}
                    </div>

                    <div>
                      {msg.message}
                    </div>

                    <div className="message-time">
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>

                  </div>

                </div>

              );

            })

          )}

          <div ref={bottomRef}></div>

        </div>

        <div className="input-group mt-3">

          <textarea
            className="form-control chat-input"
            rows="2"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />

          <button
            className="send-btn"
            onClick={sendMessage}
          >
            Send
          </button>

        </div>

      </div>
    </>
  );
}

export default Chat;