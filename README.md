<div align="center">

# 🧠 ResumeIQ

### AI-Powered Resume Intelligence Platform

Analyze. Optimize. Get Hired.

ResumeIQ leverages **Google Gemini AI** to help job seekers understand exactly how their resume performs against Applicant Tracking Systems (ATS) — and how to make it better.

<br/>

![Made with MERN](https://img.shields.io/badge/Made%20with-MERN-1abc9c?style=for-the-badge&logo=mongodb&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)
![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)

![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-8E75B2?style=flat-square&logo=googlegemini&logoColor=white)

![GitHub last commit](https://img.shields.io/github/last-commit/HiggsBoson0906/resumeiq?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/HiggsBoson0906/resumeiq?style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/HiggsBoson0906/resumeiq?style=flat-square)
![GitHub stars](https://img.shields.io/github/stars/HiggsBoson0906/resumeiq?style=flat-square)
![GitHub forks](https://img.shields.io/github/forks/HiggsBoson0906/resumeiq?style=flat-square)

<br/>

**[🚀 Live Demo](https://resume-iq-charm.vercel.app/)** &nbsp;•&nbsp; **[📖 Documentation](#-api-overview)** &nbsp;•&nbsp; **[🐛 Report Bug](#)** &nbsp;•&nbsp; **[✨ Request Feature](#)**

</div>

---

## 📋 Table of Contents

- [Overview](#-project-overview)
- [Live Demo](#-live-demo)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Folder Structure](#-folder-structure)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Running Locally](#-how-to-run-locally)
- [API Overview](#-api-overview)
- [Future Improvements](#-future-improvements)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)
- [GitHub Stats](#-github-stats)
- [Support](#-star-the-repository)

---

## 🎯 Project Overview

**ResumeIQ** is a full-stack MERN application that helps job seekers make their resumes stand out. By uploading a PDF resume, users receive an instant, AI-generated breakdown of how their resume would perform in a real-world Applicant Tracking System (ATS).

The platform uses **Google Gemini AI** to:

- 📊 Generate an **ATS Compatibility Score**
- 🔍 Identify **missing keywords** relevant to the job role
- 💪 Highlight **resume strengths**
- ⚠️ Flag **weaknesses and gaps**
- 💡 Suggest **actionable, AI-generated improvements**

Built with a secure, scalable REST architecture, ResumeIQ combines a smooth React frontend with a robust Node.js/Express backend and MongoDB persistence layer — all protected behind JWT authentication.

---

## 🚀 Live Demo

<div align="center">

### 👉 [**Try ResumeIQ Live**](https://resume-iq-charm.vercel.app/) 👈

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Now-1abc9c?style=for-the-badge)](https://resume-iq-charm.vercel.app/)

</div>

---

## ✨ Features

| Category | Feature | Description |
|---|---|---|
| 🔐 **Authentication** | User Register / Login | Secure signup and login flow |
| 🔐 **Authentication** | JWT Authentication | Stateless, token-based session handling |
| 🔐 **Authentication** | Protected Routes | Restricts access to authenticated users only |
| 📄 **Resume Handling** | Resume Upload | Upload resumes in PDF format via Multer |
| 📄 **Resume Handling** | PDF Parsing | Extracts raw text using `pdf-parse` |
| 🤖 **AI Analysis** | ATS Score | Calculates ATS compatibility score |
| 🤖 **AI Analysis** | Resume Strengths | AI-detected strong points in the resume |
| 🤖 **AI Analysis** | Missing Keywords | Flags keywords missing for target roles |
| 🤖 **AI Analysis** | Improvement Suggestions | Actionable, AI-generated recommendations |
| 🎨 **UI/UX** | Responsive UI | Fully responsive across devices |
| 🛡️ **Security** | Secure API | Input validation, auth middleware, and error handling |
| 🏗️ **Architecture** | REST Architecture | Clean, modular, and scalable REST API design |

---

## 🛠️ Tech Stack

### Frontend

<p>
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
<img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios"/>
<img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white" alt="React Router"/>
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3"/>
</p>

### Backend

<p>
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js"/>
<img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
<img src="https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white" alt="Mongoose"/>
<img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT"/>
<img src="https://img.shields.io/badge/Multer-FF6600?style=for-the-badge" alt="Multer"/>
<img src="https://img.shields.io/badge/pdf--parse-DC143C?style=for-the-badge" alt="pdf-parse"/>
<img src="https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white" alt="Google Gemini"/>
</p>

### Deployment

<p>
<img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel"/>
<img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white" alt="Render"/>
</p>

| Layer | Technologies |
|---|---|
| **Frontend** | React.js, Vite, Axios, React Router, CSS |
| **Backend** | Node.js, Express.js, MongoDB, Mongoose, JWT, Multer, pdf-parse |
| **AI Engine** | Google Gemini API |
| **Deployment** | Vercel (Frontend), Render (Backend) |

---

## 📁 Folder Structure

### Backend

```
backend/
│
├── src/
│   ├── config/          # Database & environment configuration
│   ├── controllers/     # Route controller logic
│   ├── middleware/      # Auth, error handling, validation middleware
│   ├── models/          # Mongoose schemas/models
│   ├── routes/          # API route definitions
│   ├── services/        # Business logic & Gemini AI integration
│   ├── uploads/         # Temporary storage for uploaded resumes
│   ├── utils/           # Helper/utility functions
│   ├── validators/      # Request payload validators
│   ├── app.js           # Express app configuration
│   └── server.js        # Application entry point
│
├── .env
├── package.json
└── README.md
```

### Frontend

```
frontend/
│
├── public/               # Static public assets
│
├── src/
│   ├── assets/           # Images, icons, fonts
│   ├── components/       # Reusable UI components
│   ├── context/          # React context providers
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Page-level components
│   ├── routes/           # Route definitions & protected routes
│   ├── services/         # API service functions (Axios)
│   ├── styles/           # Global & component styles
│   ├── utils/            # Helper/utility functions
│   ├── App.jsx           # Root component
│   ├── main.jsx          # Application entry point
│   └── index.css         # Global stylesheet
│
├── .env
├── package.json
└── index.html
```

---

## ⚙️ Installation

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- [Git](https://git-scm.com/)
- A **Google Gemini API Key**

### Clone the Repository

```bash
git clone https://github.com/HiggsBoson0906/resumeiq.git
cd resumeiq
```

### Install Backend Dependencies

```bash
cd backend
npm install
```

### Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file inside the **backend/** directory with the following variables:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=your_mongodb_connection_string

# Authentication
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

# Google Gemini AI
GEMINI_API_KEY=your_google_gemini_api_key

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./src/uploads

# CORS
CLIENT_URL=http://localhost:5173
```

Create a `.env` file inside the **frontend/** directory with the following variables:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

> ⚠️ **Note:** Never commit your `.env` files to version control. Ensure `.env` is listed in `.gitignore`.

---

## ▶️ How to Run Locally

### 1. Start the Backend Server

```bash
cd backend
npm run dev
```

The backend server will start on `http://localhost:5000`

### 2. Start the Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:5173`

### 3. Open in Browser

Navigate to `http://localhost:5173` to start using ResumeIQ locally.

---

## 🔌 API Overview

Base URL: `/api`

### Authentication Routes

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/auth/register` | Register a new user | ❌ |
| `POST` | `/auth/login` | Login and receive JWT | ❌ |
| `GET` | `/auth/profile` | Get logged-in user profile | ✅ |

### Resume Routes

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/resume/upload` | Upload a resume PDF | ✅ |
| `GET` | `/resume/all` | Get all resumes for a user | ✅ |
| `GET` | `/resume/:id` | Get a specific resume | ✅ |
| `DELETE` | `/resume/:id` | Delete a resume | ✅ |

### AI Analysis Routes

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/analysis/:resumeId` | Trigger AI analysis on a resume | ✅ |
| `GET` | `/analysis/:resumeId` | Retrieve analysis results | ✅ |
| `GET` | `/analysis/:resumeId/score` | Get ATS compatibility score | ✅ |
| `GET` | `/analysis/:resumeId/keywords` | Get missing keywords | ✅ |
| `GET` | `/analysis/:resumeId/suggestions` | Get improvement suggestions | ✅ |

### Sample Request

```http
POST /api/resume/upload
Authorization: Bearer <your_jwt_token>
Content-Type: multipart/form-data

{
  "resume": "<file.pdf>",
  "targetRole": "Software Engineer"
}
```

### Sample Response

```json
{
  "success": true,
  "data": {
    "atsScore": 78,
    "strengths": [
      "Strong technical skill section",
      "Clear project descriptions"
    ],
    "missingKeywords": [
      "CI/CD",
      "Unit Testing",
      "Agile Methodology"
    ],
    "suggestions": [
      "Add quantifiable metrics to achievements",
      "Include relevant certifications section"
    ]
  }
}
```

---

## 🔮 Future Improvements

- [ ] Multi-format resume support (DOCX, TXT)
- [ ] Job description matching & tailored analysis
- [ ] Resume version history & comparison
- [ ] AI-powered cover letter generator
- [ ] Export analysis reports as PDF
- [ ] LinkedIn profile optimization suggestions
- [ ] Dark mode support
- [ ] Multi-language resume support
- [ ] Admin analytics dashboard
- [ ] Integration with job boards (LinkedIn, Indeed)

---

## 🤝 Contributing

Contributions are what make the open-source community amazing! Any contributions you make are **greatly appreciated**.

1. **Fork** the repository
2. **Create** your feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit** your changes
   ```bash
   git commit -m "Add some AmazingFeature"
   ```
4. **Push** to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open** a Pull Request

Please ensure your code follows the existing style and includes relevant tests where applicable.

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2026 Tejasvi Mahule

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, subject to the following conditions...
```

---
