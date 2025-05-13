import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import api from "../api";

const UserEvents = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await api.get("/api/events/userevents", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setEvents(response.data);
      } catch (err) {
        console.error("Error fetching events: ", err);
        setMessage({ text: "Failed to load events", type: "error" });
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleRegistration = async (eventId) => {
    try {
      await api.post(
        `/api/events/${eventId}/register`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setEvents((prev) =>
        prev.map((event) =>
          event.event_id === eventId
            ? { ...event, is_attending: !event.is_attending }
            : event
        )
      );
    } catch (err) {
      console.error("Registration failed: ", err);
      setMessage({
        text: err.response?.data?.error || "Registration failed",
        type: "error",
      });
    }
  };

  return (
    <div>
      {/* Back Button */}
      <button
        className="btn btn-dark text-white mb-3 ms-3 mt-3"
        onClick={() => navigate("/UserPage")}
      >
        <i className="bi bi-arrow-left"></i> Back To Home Page
      </button>

      {/* Main Content */}
      <div className="container text-center pt-5">
        {/* Button Group */}
        <div className="btn-group mb-5" role="group" aria-label="Basic example">
          <button
            type="button"
            className="btn btn-dark"
            onClick={() => navigate("/organiser")}
          >
            My Events
          </button>
        </div>

        {/* Event Cards */}
        <div
          id="cardScrollContainer"
          className="d-flex overflow-auto gap-3 pb-3 px-5"
        >
          {events.map((event) => (
            <div
              key={event.event_id}
              className="card"
              style={{ minWidth: "300px" }}
            >
              <img
                src={`https://via.placeholder.com/400x200?text=${encodeURIComponent(
                  event.name
                )}`}
                className="card-img-top"
                alt={event.name}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{event.name}</h5>
                <p className="card-text">
                  📅 {new Date(event.date_time).toLocaleDateString()}
                  <br />
                  📍 {event.location}
                  <br />
                  🎤 Organized by: {event.organizer_name}
                </p>
                <button
                  className={`btn ${
                    event.is_attending ? "btn-success" : "btn-dark"
                  }`}
                  onClick={() => handleRegistration(event.event_id)}
                >
                  {event.is_attending ? "Attending ✓" : "Register Now"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-center text-light mt-5 py-4">
        <div className="social-icons mb-2">
          <a href="#" title="Facebook" className="text-light me-3">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="#" title="Twitter" className="text-light me-3">
            <i className="bi bi-twitter"></i>
          </a>
          <a href="#" title="LinkedIn" className="text-light">
            <i className="bi bi-linkedin"></i>
          </a>
        </div>

        <a href="#top" className="text-info d-block mb-2">
          Back to Top ↑
        </a>

        <div className="contact-info text-light">
          📧 Email: support@hacktrack.com
          <br />☎ Phone: +27 (71) 376-6731
        </div>

        <div style={{ marginTop: "15px" }}>
          &copy; 2025 HackTrack. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default UserEvents;
