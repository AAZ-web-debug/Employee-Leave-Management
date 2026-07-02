# Employee Leave Management System

A full-stack Employee Leave Management System built using the MERN stack. The application allows employees to apply for leave, track leave status, manage profiles, and enables managers to review, approve, or reject leave requests through a dedicated dashboard.

---

## Features

### Authentication & Authorization
- Secure JWT-based authentication
- Role-based access control
- Employee and Manager roles
- Protected routes
- Password hashing using bcrypt

### Employee Features
- Login securely
- View personal dashboard
- Apply for leave
- Upload supporting documents
- View leave history
- Track leave status
- Cancel pending leave requests
- Manage profile information
- Upload profile picture

### Manager Features
- Manager dashboard
- View all employees
- Search employees
- Review leave requests
- Approve leave requests
- Reject leave requests
- Add review remarks
- View employee details
- Track leave statistics

### Leave Management
- Leave overlap detection
- Automatic leave duration calculation
- Leave status tracking
- Leave balance tracking
- Approval workflow

### Dashboard & Analytics
- Employee count
- Leave request statistics
- Approved requests count
- Rejected requests count
- Pending requests count

---

## Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs
- Multer

---

## Project Structure

```text
Employee Leave Management System
│
├── backend
│   ├── scripts
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── utils
│   │   └── validators
│   └── package.json
│
├── frontend
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── context
│   │   ├── layout
│   │   └── pages
│   └── package.json
│
└── README.md
```

---

## Prerequisites

Before running the project, ensure you have:

- Node.js (v18 or above recommended)
- npm
- MongoDB Atlas account
- Git

---

## Installation

### 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/employee-leave-management-system.git

cd employee-leave-management-system
```

---

## Backend Setup

Navigate to backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file using `.env.example`:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

JWT_EXPIRES_IN=7d
```

Start backend server:

```bash
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

---

## Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start frontend:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## Creating the First Manager Account

This project does not ship with any default accounts.

After configuring MongoDB and installing dependencies, create the first manager account:

```bash
cd backend

npm run create-manager
```

You will be prompted to enter:

```text
Name
Email
Password
Department
Designation
```

Example:

```text
Name: John Doe
Email: manager@example.com
Password: password123
Department: HR
Designation: Senior Manager
```

After creation, log in using the provided credentials.

---

## API Modules

### Authentication
- Register Employee
- Login
- JWT Verification

### Profile
- View Profile
- Update Profile
- Upload Profile Picture

### Leave
- Apply Leave
- View Leave History
- Cancel Leave Request

### Manager
- View Employees
- Review Requests
- Approve Requests
- Reject Requests

### Dashboard
- Employee Statistics
- Leave Statistics
- Approval Metrics

---

## Database Models

### User

```js
{
  name,
  email,
  password,
  role,
  department,
  designation,
  employeeId,
  phone,
  manager,
  annualLeaveBalance,
  profileImage,
  isActive,
  lastLogin
}
```

### Leave

```js
{
  employee,
  leaveType,
  startDate,
  endDate,
  totalDays,
  reason,
  attachment,
  status,
  managerRemarks,
  reviewedBy,
  reviewedAt
}
```

---

## Screenshots

Add screenshots here before publishing:

### Landing Page

![Landing Page](screenshots/landing-page.png)

### Login Page

![Login](screenshots/login-page.png)

### Employee Dashboard

![Employee Dashboard](screenshots/employee-dashboard.png)

### Manager Dashboard

![Manager Dashboard](screenshots/manager-dashboard.png)

### Leave Approval

![Leave Approval](screenshots/leave-approval.png)

### Employee Directory

![Employee Directory](screenshots/employees.png)

---

## Security Notes

- Passwords are hashed using bcrypt.
- Authentication is handled through JWT tokens.
- Environment variables are excluded from version control.
- MongoDB credentials are not stored in the repository.

---

## Future Enhancements

- Email notifications
- Password reset
- Leave calendar
- Team-wise reporting
- Admin role
- Export reports as PDF
- Advanced analytics dashboard
- Multi-level approval workflow

---

## Author

Aditya Anand Zalke

B.Tech Computer Science Engineering

---

## License

This project is developed for educational and learning purposes.