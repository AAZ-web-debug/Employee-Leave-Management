import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px 30px",
        background: "#1e293b",
      }}
    >
      <h2>Leave Management</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
        }}
      >
        {user?.role === "manager" ? (
          <Link to="/manager-dashboard">
            Dashboard
          </Link>
        ) : (
          <Link to="/employee-dashboard">
            Dashboard
          </Link>
        )}

        <Link to="/my-leaves">
          My Leaves
        </Link>

        <Link to="/apply-leave">
          Apply Leave
        </Link>

        <Link to="/profile">
          Profile
        </Link>

        <button onClick={handleLogout}>
          Logout
        </button>

        <span>{user?.name}</span>
      </div>
    </nav>
  );
};

export default Navbar;