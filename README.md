# Employee Leave Management System

A full-stack Employee Leave Management System built using the MERN stack. The application enables employees to apply for leave, manage profiles, track leave balances, and monitor leave requests, while managers can review requests, manage employees, and monitor workforce availability through a dedicated dashboard.

---

## Features

### Authentication & Authorization

- JWT-based authentication
- Secure password hashing using bcrypt
- Role-based access control
- Employee and Manager roles
- Protected frontend and backend routes
- Persistent login sessions

---

## Employee Features

### Profile Management

- View personal profile
- Update profile information
- Upload profile picture
- Change password

### Leave Management

- Apply for leave requests
- Select leave type
- Add leave reason
- Upload supporting documents
- Automatic leave duration calculation
- Leave balance validation
- View leave history
- Track leave request status
- View manager remarks

### Dashboard

- Personal leave statistics
- Available leave balance
- Leave request summary

---

## Manager Features

### Employee Management

- View all employees
- Search employees by:
  - Name
  - Email
  - Employee ID
- View detailed employee profiles
- Update employee department
- Update employee designation

### Leave Approval Workflow

- Review leave requests
- View leave reasons
- View leave attachments
- Approve requests
- Reject requests
- Add manager remarks
- Track request status

### Workforce Availability (Manpower Module)

- View workforce availability for any date
- Quick access to:
  - Yesterday
  - Today
  - Tomorrow
- Custom date selection
- View:
  - Total Employees
  - Employees On Duty
  - Employees On Leave
- Direct navigation to employee details
- Real-time workforce availability tracking

### Dashboard & Analytics

- Employee count
- Approved leave count
- Rejected leave count
- Pending leave count
- Leave request statistics

---

## Leave Management Features

- Leave overlap detection
- Automatic leave balance deduction
- Leave balance validation
- Leave duration calculation
- Leave approval workflow
- Leave status tracking
- Leave attachment support

---

## Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Lucide React

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
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── uploads
│   ├── utils
│   └── package.json
│
├── frontend
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── context
│   │   ├── layout
│   │   ├── pages
│   │   └── routes
│   └── package.json
│
└── README.md
```

---

## Prerequisites

Before running the project, ensure you have:

- Node.js (v18 or above)
- npm
- MongoDB Atlas Account
- Git

---

## Installation

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/employee-leave-management-system.git

cd employee-leave-management-system
```

---

## Backend Setup

```bash
cd backend

npm install
```

Create a `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

JWT_EXPIRES_IN=7d
```

Start the backend server:

```bash
npm run dev
```

Backend runs at:

```text
http://localhost:5000
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

## Creating the First Manager Account

After configuring MongoDB and installing dependencies:

```bash
cd backend

npm run create-manager
```

Example:

```text
Name: John Doe
Email: manager@example.com
Password: password123
Department: HR
Designation: Senior Manager
```

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
- Change Password

### Leave

- Apply Leave
- View Leave History
- Track Leave Status
- Upload Leave Attachments

### Manager

- View Employees
- Search Employees
- Review Leave Requests
- Approve Requests
- Reject Requests
- Add Remarks

### Dashboard

- Employee Statistics
- Leave Statistics
- Approval Metrics
- Workforce Availability

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
  annualLeaveBalance,
  profileImage,
  createdAt,
  updatedAt
}
```

### Leave

```js
{
  employee,
  leaveType,
  fromDate,
  toDate,
  totalDays,
  reason,
  attachment,
  status,
  managerRemarks,
  reviewedBy,
  reviewedAt,
  createdAt
}
```

---

## Screenshots

Add screenshots before publishing:

- Login Page
- Employee Dashboard
- Apply Leave
- Leave History
- Employee Profile
- Manager Dashboard
- Leave Approval Panel
- Employee Directory
- Employee Details Page
- Workforce Availability (Manpower Module)

---

## Security Features

- JWT Authentication
- Password Hashing (bcrypt)
- Protected API Routes
- Role-Based Access Control
- Secure File Upload Handling
- Environment Variable Protection

---

## Future Enhancements

- Email Notifications
- Password Reset
- Leave Calendar View
- Public Holiday Management
- Advanced Leave Analytics Dashboard
- Export Reports
- Multi-Level Approval Workflow
- Admin Role

---

## Author

**Aditya Anand Zalke**

B.Tech Computer Science Engineering

---

## License

This project is developed for educational and learning purposes.