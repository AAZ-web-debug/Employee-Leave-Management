import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";

import EmployeeDashboard from "./pages/EmployeeDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";

import MyLeaves from "./pages/MyLeaves";
import ApplyLeave from "./pages/ApplyLeave";
import Profile from "./pages/Profile";
import Employees from "./pages/Employees";
import EmployeeDetails from "./pages/EmployeeDetails";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<LandingPage />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/employee-dashboard"
          element={
            <ProtectedRoute>
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manager-dashboard"
          element={
            <ProtectedRoute>
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-leaves"
          element={
            <ProtectedRoute>
              <MyLeaves />
            </ProtectedRoute>
          }
        />

        <Route
          path="/apply-leave"
          element={
            <ProtectedRoute>
              <ApplyLeave />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
        path="/employees"
        element={
    <ProtectedRoute>
      <Employees />
    </ProtectedRoute>
  }
      />

      <Route
  path="/employees/:id"
  element={
    <ProtectedRoute>
      <EmployeeDetails />
    </ProtectedRoute>
  }
/>

        <Route
          path="*"
          element={<h1>404 - Page Not Found</h1>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;