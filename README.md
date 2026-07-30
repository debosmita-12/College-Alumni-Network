<div align="center">

#  Alumni Nexus

### Alumni Networking & Mentorship Platform

A full-stack MERN application that connects **Students**, **Alumni**, and **Administrators** through mentorship, networking, career opportunities, and community engagement.

---

###  Developed By

**Debosmita Mukhopadhyay**  
**Shashwat Sahu**  
**Shubham Sagar**  
**Tasleemuddin MD**

---

**Technology Stack**

React.js • Node.js • Express.js • MongoDB • JWT Authentication

</div>

---

#  Overview

**Alumni Nexus** is a full-stack MERN application designed to strengthen the relationship between students and alumni by providing a centralized platform for networking, mentorship, career opportunities, and community interaction.

The platform enables students to discover experienced alumni, request mentorship, communicate through direct messaging, explore job and internship opportunities, and actively participate in a collaborative alumni community.

The application follows a secure role-based architecture with separate dashboards for **Students**, **Alumni**, and **Administrators**, ensuring an intuitive and personalized experience for every user.

---

#  Features

##  Student

- Secure Registration & Login
- JWT Authentication
- Personalized Dashboard
- View Alumni Profiles
- Send Mentorship Requests
- Community Feed
- Direct Messaging
- Browse Opportunities
- Edit Profile

---

##  Alumni

- Secure Login
- Manage Mentorship Requests
- Accept or Reject Requests
- Create Career Opportunities
- Community Posting
- Student Messaging
- Professional Profile Management

---

##  Administrator

- Dashboard Analytics
- User Management
- Opportunity Management
- Community Moderation
- Platform Statistics
- Role-Based Administration

---

#  Technology Stack

| Category | Technologies |
|-----------|--------------|
| **Frontend** | React.js, React Router, Bootstrap, CSS3, Axios |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |
| **Authentication** | JWT (JSON Web Token) |
| **API** | RESTful API |
| **Version Control** | Git, GitHub |
| **Development Tools** | VS Code, Postman, npm |

---

#  System Architecture

```
            React Frontend
                   │
             Axios REST API
                   │
          Express + Node Server
                   │
        JWT Authentication Layer
                   │
          MongoDB Database
```

---

#  Project Structure

```
College-Alumni-Network
│
├── client
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   ├── services
│   │   ├── styles
│   │   ├── App.jsx
│   │   └── main.jsx
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── app.js
│   └── server.js
│
└── README.md
```

---

#  Authentication & Security

The application implements **JWT-based Authentication** with secure access control.

### Security Features

- User Registration
- Secure Login
- Password Encryption
- JWT Authentication
- Protected Routes
- Authorization Middleware
- Role-Based Access Control

---

#  User Roles

| Role | Capabilities |
|------|--------------|
| **Student** | Networking, Mentorship, Messaging, Opportunities |
| **Alumni** | Mentorship Management, Community, Opportunities |
| **Administrator** | User Management, Moderation, Analytics |

---

#  Modules

- Landing Page
- Authentication
- Student Dashboard
- Alumni Dashboard
- Admin Dashboard
- Community Feed
- Mentorship Requests
- Messaging System
- Career Opportunities
- User Profile Management

---

#  Highlights

- Modern Responsive UI
- MERN Stack Architecture
- JWT Authentication
- Role-Based Authorization
- RESTful APIs
- Modular Backend Design
- Reusable React Components
- Scalable Project Structure

---

#  Installation

### Clone Repository

```bash
git clone https://github.com/debosmita-12/College-Alumni-Network.git
```

### Install Dependencies

Frontend

```bash
cd client
npm install
```

Backend

```bash
cd ../server
npm install
```

---

### Configure Environment Variables

Create a `.env` file inside the **server** folder.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

### Run Backend

```bash
npm start
```

### Run Frontend

```bash
cd client
npm run dev
```

---

#  REST API Modules

- Authentication API
- User API
- Dashboard API
- Mentorship API
- Messaging API
- Community API
- Opportunity API
- Administration API

---

#  Future Enhancements

- Real-Time Chat (Socket.io)
- Video Mentorship Sessions
- AI-Based Career Recommendation
- Resume Analyzer
- Event Management
- Push Notifications
- Google Authentication
- Email Verification
- Mobile Application
- Internship Recommendation Engine

---

#  Learning Outcomes

This project helped us gain hands-on experience with:

- Full Stack MERN Development
- React.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- REST API Development
- Role-Based Authorization
- Backend Architecture
- React Context API
- Git & GitHub Collaboration

---

#  Contributors

| Name | Role |
|------|------|
| **Debosmita Mukhopadhyay** | Frontend & Backend Development |
| **Shashwat Sahu** | Full Stack Development |
| **Shubham Sagar** | Backend Development |
| **Tasleemuddin MD** | Frontend Development |

---

#  Contact

**GitHub Repository**

https://github.com/debosmita-12/College-Alumni-Network

---

<div align="center">

⭐ If you found this project useful, consider giving it a star!

Made with ❤️ using the MERN Stack

</div>
