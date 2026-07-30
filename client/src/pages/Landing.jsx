import { Link } from "react-router-dom";
import "./Landing.css";

function Landing() {
  return (
    <div className="landing">

      {/* ================= NAVBAR ================= */}

      <nav className="navbar">

        <div className="logo">

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="42"
            height="42"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917z" />

            <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466z" />
          </svg>

          <span>
            Alumni <strong>Nexus</strong>
          </span>

        </div>

        <ul className="nav-links">

          <li><a href="#about">About</a></li>

          <li><a href="#features">Features</a></li>

          <li><a href="#contact">Developers</a></li>

        </ul>

        <div className="nav-buttons">

          <Link to="/login" className="login-btn">
            Login
          </Link>

          <Link to="/register" className="register-btn">
            Register
          </Link>

        </div>

      </nav>

      {/* ================= HERO ================= */}

      <section className="hero" id="about">

        <div className="hero-content">

          <h1>

            Alumni <span>Nexus</span>

          </h1>

          <div className="hero-divider">

            <div className="line"></div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="42"
              height="42"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917z"/>

              <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466z"/>
            </svg>

            <div className="line"></div>

          </div>

          <h2>

            Connecting Students, Alumni &
            <br />
            Career Opportunities

          </h2>

          <p>

            Empowering students through mentorship,
            networking, community engagement,
            and career opportunities.

          </p>

        </div>

      </section>
     {/* ================= STATISTICS ================= */}

<section className="stats-section">

    <div className="stats-container">

        <div className="stat-card">

            <h2>500+</h2>

            <p>Registered Alumni</p>

        </div>

        <div className="stat-card">

            <h2>1200+</h2>

            <p>Students Connected</p>

        </div>

        <div className="stat-card">

            <h2>350+</h2>

            <p>Mentorship Requests</p>

        </div>

        <div className="stat-card">

            <h2>150+</h2>

            <p>Career Opportunities</p>

        </div>

    </div>

</section>
      {/* ================= FEATURES ================= */}

<section className="features-section" id="features">

    <div className="section-title">

        <h2>Platform Features</h2>

        <p>
            Everything you need to build strong alumni relationships and
            accelerate your career.
        </p>

    </div>

    <div className="features-grid">

        <div className="feature-card">

            <div className="feature-circle"><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-mortarboard-fill" viewBox="0 0 16 16"> <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917z"/> <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466z"/> </svg></div>

            <h3>Mentorship</h3>

            <p>
                Connect with experienced alumni mentors for career guidance,
                interview preparation and professional growth.
            </p>

        </div>

        <div className="feature-card">

            <div className="feature-circle"><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-briefcase-fill" viewBox="0 0 16 16"> <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v1.384l7.614 2.03a1.5 1.5 0 0 0 .772 0L16 5.884V4.5A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5"/> <path d="M0 12.5A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5V6.85L8.129 8.947a.5.5 0 0 1-.258 0L0 6.85z"/> </svg></div>

            <h3>Career Opportunities</h3>

            <p>
                Explore internships, jobs, research opportunities and
                recommendations shared by alumni.
            </p>

        </div>

        <div className="feature-card">

            <div className="feature-circle"><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-chat-fill" viewBox="0 0 16 16"> <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9 9 0 0 0 8 15"/> </svg></div>

            <h3>Community</h3>

            <p>
                Create posts, interact with your peers, ask questions and
                participate in meaningful discussions.
            </p>

        </div>

        <div className="feature-card">

            <div className="feature-circle"><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16"> <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/> </svg></div>

            <h3>Professional Network</h3>

            <p>
                Expand your network by connecting with alumni working across
                different companies and industries.
            </p>

        </div>

    </div>

</section>

{/* ================= WHY ================= */}

<section className="why-section">

    <div className="section-title">

        <h2>Why Alumni Nexus?</h2>

        <p>
            Bringing students and alumni together through one modern platform.
        </p>

    </div>

    <div className="why-grid">

        <div className="why-card">
            <span><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-shield-fill-check" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.8 11.8 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7 7 0 0 0 1.048-.625 11.8 11.8 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.54 1.54 0 0 0-1.044-1.263 63 63 0 0 0-2.887-.87C9.843.266 8.69 0 8 0m2.146 5.146a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793z"/>
</svg></span>
            <h4>Secure Authentication</h4>
        </div>

        <div className="why-card">
            <span><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-person-check-fill" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0"/> <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/> </svg></span>
            <h4>Role Based Dashboard</h4>
        </div>

        <div className="why-card">
            <span><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-person-lines-fill" viewBox="0 0 16 16"> <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z"/> </svg></span>
            <h4>Mentorship Requests</h4>
        </div>

        <div className="why-card">
            <span><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-chat-fill" viewBox="0 0 16 16"> <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9 9 0 0 0 8 15"/> </svg></span>
            <h4>Real-time Messaging</h4>
        </div>

        <div className="why-card">
            <span><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-newspaper" viewBox="0 0 16 16"> <path d="M0 2.5A1.5 1.5 0 0 1 1.5 1h11A1.5 1.5 0 0 1 14 2.5v10.528c0 .3-.05.654-.238.972h.738a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 1 1 0v9a1.5 1.5 0 0 1-1.5 1.5H1.497A1.497 1.497 0 0 1 0 13.5zM12 14c.37 0 .654-.211.853-.441.092-.106.147-.279.147-.531V2.5a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5v11c0 .278.223.5.497.5z"/> <path d="M2 3h10v2H2zm0 3h4v3H2zm0 4h4v1H2zm0 2h4v1H2zm5-6h2v1H7zm3 0h2v1h-2zM7 8h2v1H7zm3 0h2v1h-2zm-3 2h2v1H7zm3 0h2v1h-2zm-3 2h2v1H7zm3 0h2v1h-2z"/> </svg></span>
            <h4>Community Feed</h4>
        </div>

        <div className="why-card">
            <span><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-briefcase-fill" viewBox="0 0 16 16"> <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v1.384l7.614 2.03a1.5 1.5 0 0 0 .772 0L16 5.884V4.5A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5"/> <path d="M0 12.5A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5V6.85L8.129 8.947a.5.5 0 0 1-.258 0L0 6.85z"/> </svg></span>
            <h4>Career Opportunities</h4>
        </div>

    </div>

</section>

{/* ================= TECH STACK ================= */}

<section className="tech-section">

    <h2>Built With</h2>

    <div className="tech-container">

        <span>React</span>

        <span>Node.js</span>

        <span>Express.js</span>

        <span>MongoDB</span>

        <span>JWT</span>

        <span>Bootstrap</span>

    </div>

</section>

{/* ================= DEVELOPERS ================= */}

<section className="developers">

    <h2>Developed By</h2>

    <div className="developer-grid">

        <div className="developer-card">

            <h3>Debosmita Mukhopadhyay</h3>

        </div>

        <div className="developer-card">

            <h3>Shashwat Sahu</h3>

        </div>

        <div className="developer-card">

            <h3>Shubham Sagar</h3>

        </div>

        <div className="developer-card">

            <h3>Tasleemuddin MD</h3>

        </div>

    </div>
</section>

{/* ================= FOOTER ================= */}

<footer className="footer" id="contact">

    <h3>Alumni Nexus</h3>

    <p>

        Connecting Students, Alumni &
        Career Opportunities.

    </p>

    <p className="copyright">

        © 2026 Alumni Nexus.
        All Rights Reserved.

    </p>

</footer>

    </div>
  );
}

export default Landing;