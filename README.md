# AttendMaster - Smart Attendance Management System

AttendMaster is a modern, full-stack Attendance Management System built with the MERN stack (MongoDB, Express.js, React, Node.js). It provides a comprehensive solution for educational institutions to manage students, teachers, classes, and track attendance with ease.

![AttendMaster](https://img.shields.io/badge/MERN-Stack-blue.svg)
![React](https://img.shields.io/badge/Frontend-React-61DAFB.svg)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933.svg)
![TailwindCSS](https://img.shields.io/badge/Styling-TailwindCSS-38B2AC.svg)

##  Key Features

- **Attendance Tracking**: Marking and monitoring attendance for students across different classes and subjects.
- **Role-Based Management**: Separate dashboards and functionalities for Admins, Teachers, and Students.
- **Bulk Import**: Support for importing student and teacher data via CSV and Excel files.
- **Report Generation**: Export attendance reports and data in PDF and Excel formats.
- **Modern UI/UX**: Responsive and interactive interface built with Tailwind CSS and Framer Motion.
- **Secure Authentication**: Robust authentication system using JWT and cookies.

##  Tech Stack

### Frontend
- **Framework**: React.js (Vite)
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit & Redux Persist
- **Animations**: Framer Motion & Lottie-react
- **Notifications**: React Hot Toast & React Toastify
- **Data Export**: JSPDF, html2canvas, XLSX

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens) & Cookie-parser
- **File Handling**: Multer
- **Email Service**: Nodemailer
- **Data Parsing**: CSV-parser & XLSX

##  Project Structure

```text
├── api/                # Backend source code
│   ├── controllers/    # Request handlers
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API endpoints
│   ├── utils/          # Helper functions
│   └── index.js        # Server entry point
├── client/             # Frontend source code
│   ├── src/            # React components and logic
│   ├── public/         # Static assets
│   └── vite.config.js  # Vite configuration
├── uploads/            # Directory for uploaded files
├── .env                # Environment variables
└── package.json        # Project dependencies and scripts
```

##  Installation & Setup

### Prerequisites
- Node.js (v16+)
- MongoDB (Local or Atlas)

### 1. Clone the repository
```bash
git clone https://github.com/MayankAgrawal2005/Attendmaster.git
cd Attendmaster
```

### 2. Install Dependencies
Install root and backend dependencies:
```bash
npm install
```
Install frontend dependencies:
```bash
npm install --prefix client
```

### 3. Environment Variables
Create a `.env` file in the root directory and add the following:
```env
MONGO=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
MAIL_HOST=smtp.gmail.com
EMAIL=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

### 4. Running the Application
To start both the backend and frontend in development mode:

**Run Backend:**
```bash
npm run dev
```

**Run Frontend:**
```bash
cd client
npm run dev
```



---
Built with ❤️ by [Mayank Agrawal](https://github.com/MayankAgrawal2005)
