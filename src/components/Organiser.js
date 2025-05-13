import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Organiser = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Back Button */}
      <button className="btn btn-dark text-white mb-3 ms-3 mt-3" onClick={() => navigate('/HomePage')}>
        <i className="bi bi-arrow-left"></i> Back To Home Page
      </button>

      {/* Main Content */}
      <div className="container text-center pt-5">
        {/* Button Group */}
        <div className="btn-group mb-5" role="group" aria-label="Basic example">
          <button type="button" className="btn btn-dark" onClick={() => navigate('/organiser')}>
            My Events
          </button>
          <button type="button" className="btn btn-light" onClick={() => navigate('/create-event')}>
            Create Events
          </button>
        </div>

        {/* Event Cards */}
        <div className="row justify-content-center">
          {[1, 2].map((event, index) => (
            <div className="col-md-4 mb-5" key={index}>
              <div className="card">
                <img src={`https://via.placeholder.com/400x200?text=Event+${event}`} className="card-img-top" alt={`Event ${event}`} />
                <div className="card-body">
                  <h5 className="card-title">Event {event}</h5>
                  <p className="card-text">Coming Soon...</p>
                  <button className="btn btn-primary">View Event</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-center text-light mt-5 py-4">
        <div className="social-icons mb-2">
          <a href="#" title="Facebook" className="text-dark me-3"><i className="bi bi-facebook"></i></a>
          <a href="#" title="Twitter" className="text-dark me-3"><i className="bi bi-twitter"></i></a>
          <a href="#" title="LinkedIn" className="text-dark"><i className="bi bi-linkedin"></i></a>
        </div>

        <a href="#top" className="text-dark me-3">Back to Top ↑</a>

        <div className="contact-info text-dark">
          📧 Email: support@hacktrack.com<br />
          ☎ Phone: +27 (71) 376-6731
        </div>

        <div className="contact-info text-dark" style={{ marginTop: '15px' }}>
          &copy; 2025 HackTrack. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Organiser;
