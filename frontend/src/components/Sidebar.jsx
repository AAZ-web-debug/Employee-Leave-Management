import {
  LayoutDashboard,
  CalendarDays,
  User,
  Users,
  LogOut,
  Menu,
  ChevronLeft,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Sidebar = ({
  collapsed,
  setCollapsed,
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navClass = `
    flex items-center gap-3
    px-4 py-3
    rounded-xl
    text-zinc-400
    hover:text-white
    hover:bg-white/[0.04]
    border border-transparent
    hover:border-white/[0.06]
    transition-all duration-200
  `;

  const getNavClass = (isActive) =>
    `
      ${navClass}
      ${
        isActive
          ? `
            relative
            bg-blue-500/10
            text-white
            border border-blue-500/20
            shadow-[0_0_20px_rgba(59,130,246,0.15)]

          `
          : ""
      }
    `;

  return (
    <aside
      className={`fixed top-0 left-0 h-screen
      bg-[#0f141b]/95
      backdrop-blur-xl
      border-r border-white/[0.08]
      shadow-[0_0_40px_rgba(37,99,235,0.08)]
      transition-all duration-300
      flex flex-col
      ${
        collapsed
          ? "w-20"
          : "w-60"
      }`}
    >
      <div className="flex items-center justify-between p-5 border-b border-white/[0.08]">
        {!collapsed && (
          <div>
            <h1 className="font-bold text-xl text-white">
              Leave Portal
            </h1>

            <p className="text-xs text-zinc-500">
              Employee Management
            </p>
          </div>
        )}

        <button
          onClick={() =>
            setCollapsed(!collapsed)
          }
          className="hover:text-white text-gray-400 transition"
        >
          {collapsed ? (
            <Menu size={20} />
          ) : (
            <ChevronLeft size={20} />
          )}
        </button>
      </div>

      <nav className="p-4 space-y-2 flex-1">
        <NavLink
          to={
            user?.role === "manager"
              ? "/manager-dashboard"
              : "/employee-dashboard"
          }
          className={({ isActive }) =>
            getNavClass(isActive)
          }
        >
          <LayoutDashboard size={20} />
          {!collapsed && (
            <span>Dashboard</span>
          )}
        </NavLink>

        {user?.role === "manager" && (
          <NavLink
            to="/employees"
            className={({ isActive }) =>
              getNavClass(isActive)
            }
          >
            <Users size={20} />
            {!collapsed && (
              <span>Employees</span>
            )}
          </NavLink>
        )}

        {user?.role === "employee" && (
          <NavLink
            to="/my-leaves"
            className={({ isActive }) =>
              getNavClass(isActive)
            }
          >
            <CalendarDays size={20} />
            {!collapsed && (
              <span>My Leaves</span>
            )}
          </NavLink>
        )}

        {user?.role === "employee" && (
          <NavLink
            to="/apply-leave"
            className={({ isActive }) =>
              getNavClass(isActive)
            }
          >
            <CalendarDays size={20} />
            {!collapsed && (
              <span>Apply Leave</span>
            )}
          </NavLink>
        )}

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            getNavClass(isActive)
          }
        >
          <User size={20} />
          {!collapsed && (
            <span>Profile</span>
          )}
        </NavLink>
      </nav>

      <div className="p-4 border-t border-white/[0.08]">
        {!collapsed ? (
          <>
            <div
              className="
              mb-4
              rounded-2xl
              border border-white/[0.08]
              bg-white/[0.03]
              p-3
              flex items-center gap-3
            "
            >
              <div
              className="
              w-12 h-12
              rounded-full
              overflow-hidden
              border border-white/10
              bg-zinc-800
              flex items-center justify-center
            "
            >
              {user?.profileImage ? (
                <img
                  src={`http://localhost:5000/${user.profileImage}`}
                  alt={user?.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-lg font-semibold">
                  {user?.name?.charAt(0)?.toUpperCase() ||
                    "U"}
                </span>
              )}
            </div>

              <div>
                <p className="font-medium text-white">
                  {user?.name ||
                    "User"}
                </p>

                <span
                  className="
                  text-xs
                  px-2 py-1
                  rounded-full
                  bg-zinc-500/20
                  text-zinc-300
                  border border-white/20
                "
                >
                  {user?.role?.charAt(0).toUpperCase() +
                    user?.role?.slice(
                      1
                    )}
                </span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="
              flex items-center gap-3
              p-3
              rounded-xl
              w-full
              hover:bg-red-500/10
              hover:text-red-400
              border border-transparent
              hover:border-red-500/20
              transition
            "
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <div
            className="
            w-10 h-10
            rounded-full
            overflow-hidden
            border border-white/10
            bg-[#2c333d]
            flex items-center justify-center
          "
          >
            {user?.profileImage ? (
              <img
                src={`http://localhost:5000/${user.profileImage}`}
                alt={user?.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="font-semibold">
                {user?.name?.charAt(0)?.toUpperCase() ||
                  "U"}
              </span>
            )}
          </div>

            <LogOut
              size={20}
              className="
              cursor-pointer
              hover:text-red-400
              transition
            "
              onClick={handleLogout}
            />
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;