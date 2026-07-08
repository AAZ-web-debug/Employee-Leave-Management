import DashboardLayout from "../layout/DashboardLayout";
import GlowBorderCard from "../components/GlowBorderCard";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

const Employees = () => {

    const [employees, setEmployees] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");

    const [message, setMessage] =
  useState("");

const [isSuccess, setIsSuccess] =
  useState(false);

    const [selectedImage, setSelectedImage] =
  useState(null);

  const [employeeToDelete, setEmployeeToDelete] =
  useState(null);

const [showDeleteModal, setShowDeleteModal] =
  useState(false);

const [showModal, setShowModal] =
  useState(false);

const [formData, setFormData] =
  useState({
    name: "",
    email: "",
    password: "",
    department: "",
    designation: "",
  });

useEffect(() => {
  fetchEmployees();
}, []);

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const handleCreateEmployee = async () => {
  try {
    await api.post(
      "/employees",
      formData
    );

    setIsSuccess(true);

setMessage(
  "Employee created successfully"
);

    setShowModal(false);

    setFormData({
      name: "",
      email: "",
      password: "",
      department: "",
      designation: "",
    });

    fetchEmployees();
  } catch (error) {
  console.error(error);

  setIsSuccess(false);

  setMessage(
    error?.response?.data?.message ||
    "Failed to create employee"
  );
}
};

const handleDeleteEmployee =
  async (id) => {

    try {
      await api.delete(
        `/employees/${id}`
      );

      fetchEmployees();

      setShowDeleteModal(false);
setEmployeeToDelete(null);

setIsSuccess(true);

setMessage(
  "Employee deleted successfully"
);

    } catch (error) {
      console.error(error);

      setIsSuccess(false);

setMessage(
  "Failed to delete employee"
);
    }
  };

const fetchEmployees = async () => {
  try {
    const response = await api.get(
      "/employees"
    );

    setEmployees(
      response.data.data || []
    );
  } catch (error) {
    console.error(error);
  }
};

const filteredEmployees =
  employees.filter((employee) =>
    `
      ${employee.name}
      ${employee.email}
      ${employee.employeeId || ""}
    `
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-8 min-h-screen text-zinc-100">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-white tracking-tight">
              Employees
            </h1>

            <p className="text-zinc-500 mt-2 text-sm">
              Manage employees in your organization
            </p>
          </div>

          <button
  onClick={() =>
    setShowModal(true)
  }
  className="
    inline-flex
    items-center
    justify-center
    px-6 py-3
    rounded-xl
    bg-white/[0.05]
    border border-white/[0.1]
    hover:bg-white/[0.08]
    text-white
    font-medium
    transition-all
    duration-200
    shadow-[0_0_20px_rgba(37,99,235,0.3)]
    hover:shadow-[0_0_25px_rgba(37,99,235,0.5)]
  "
>
  + Add Employee
</button>
        </div>

        <GlowBorderCard>
          <div className="dashboard-beam absolute inset-0 bg-gradient-to-r from-blue-500/40 via-indigo-500/40 to-purple-500/40 opacity-70" />

          <div
            className="
              relative
              w-full
              h-full
              overflow-hidden
              rounded-3xl
              border border-white/[0.08]
              bg-[#12161d]/95
              backdrop-blur-xl
              shadow-[0_0_80px_rgba(255,255,255,0.03)]
              p-6 sm:p-10
            "
          >
            <h2 className="text-xl font-semibold text-white mb-6">
              Employee List
            </h2>

            <div className="mb-6">
  <input
    type="text"
    placeholder="Search employees..."
    value={searchTerm}
    onChange={(e) =>
      setSearchTerm(e.target.value)
    }
    className="
      w-full max-w-sm
      px-4 py-3
      rounded-xl
      bg-[#1a1f27]
      border border-white/10
      text-white
      outline-none
      focus:border-blue-500
    "
  />
</div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.08] text-sm text-zinc-500">
                    
                    <th className="text-left py-4 px-4">
                    Photo
                    </th>
                    
                    <th className="text-left py-4 px-4">
                      Name
                    </th>

                    <th className="text-left py-4 px-4">
                      Email
                    </th>

                    <th className="text-left py-4 px-4">
                      Department
                    </th>

                    <th className="text-left py-4 px-4">
                      Designation
                    </th>

                    <th className="text-left py-4 px-4">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                {employees.length === 0 ? (
                    <tr>
                    <td
                        colSpan="5"
                        className="py-16 text-center text-zinc-500"
                    >
                        No employees found.
                    </td>
                    </tr>
                ) : (
                    filteredEmployees.map((employee) => (
                    <tr
                        key={employee._id}
                        className="border-b border-white/[0.04]"
                    >
                        <td className="py-4 px-4">
                        <img
                        src={
                            employee.profileImage
                            ? `http://localhost:5000/${employee.profileImage}`
                            : "https://ui-avatars.com/api/?name=" +
                                encodeURIComponent(
                                employee.name
                                )
                        }
                        alt={employee.name}
                        onClick={() =>
                            setSelectedImage(
                            employee.profileImage
                                ? `http://localhost:5000/${employee.profileImage}`
                                : "https://ui-avatars.com/api/?name=" +
                                    encodeURIComponent(
                                    employee.name
                                    )
                            )
                        }
                        className="
                            w-12 h-12
                            rounded-full
                            object-cover
                            border border-white/10
                            cursor-pointer
                            hover:scale-105
                            transition
                        "
                        />
                        </td>
                        
                        <td className="py-4 px-4">
                        <Link
                            to={`/employees/${employee._id}`}
                            className="
                            text-white
                            font-medium
                            hover:text-blue-400
                            transition-colors
                            "
                        >
                            {employee.name}
                        </Link>
                        </td>

                        <td className="py-4 px-4">
                        {employee.email}
                        </td>

                        <td className="py-4 px-4">
                        {employee.department || "-"}
                        </td>

                        <td className="py-4 px-4">
                        {employee.designation || "-"}
                        </td>

                        <td className="py-4 px-4">
                        <button
                        onClick={() => {
                          setEmployeeToDelete(employee._id);
                          setShowDeleteModal(true);
                        }}
                        className="
                            px-3
                            py-1.5
                            rounded-lg
                            border
                            border-red-500/30
                            bg-red-500/10
                            text-red-400
                            hover:bg-red-500/20
                            transition
                        "
                        >
                        Delete
                        </button>
                        </td>
                    </tr>
                    ))
                )}
                </tbody>
              </table>
            </div>
          </div>
        </GlowBorderCard>
      </div>

                {showModal && (
  <div
    className="
      fixed inset-0 z-50
      bg-black/60
      backdrop-blur-sm
      flex items-center justify-center
      p-4
    "
  >
    <div
      className="
        w-full max-w-lg
        rounded-3xl
        border border-white/10
        bg-[#12161d]
        p-8
      "
    >
      <h2 className="text-2xl font-semibold mb-6">
        Add Employee
      </h2>

      {message && (
  <div
    className={`
      mb-4
      rounded-xl
      p-4
      border
      ${
        isSuccess
          ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
          : "bg-red-500/10 border-red-500/20 text-red-400"
      }
    `}
  >
    {message}
  </div>
)}

      <div className="space-y-4">
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-[#1b2028]"
        />

        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-[#1b2028]"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-[#1b2028]"
        />

        <input
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-[#1b2028]"
        />

        <input
          name="designation"
          placeholder="Designation"
          value={formData.designation}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-[#1b2028]"
        />
      </div>

      <div className="flex justify-end gap-3 mt-8">
        <button
          onClick={() =>
            setShowModal(false)
          }
          className="px-4 py-2 rounded-xl border border-white/10"
        >
          Cancel
        </button>

        <button
          onClick={
            handleCreateEmployee
          }
          className="
            px-5 py-2
            rounded-xl
            bg-blue-600
            hover:bg-blue-500
          "
        >
          Create
        </button>
        
      </div>
    </div>
  </div>
)}

{showDeleteModal && (
  <div
    className="
      fixed inset-0 z-50
      bg-black/60
      backdrop-blur-sm
      flex items-center justify-center
      p-4
    "
  >
    <div
      className="
        w-full max-w-md
        rounded-3xl
        border border-white/10
        bg-[#12161d]
        p-8
      "
    >
      <h2 className="text-xl font-semibold text-white mb-3">
        Delete Employee
      </h2>

      <p className="text-zinc-400 mb-8">
        Are you sure you want to delete this employee?
        This action cannot be undone.
      </p>

      <div className="flex justify-end gap-3">
        <button
          onClick={() => {
            setShowDeleteModal(false);
            setEmployeeToDelete(null);
          }}
          className="
            px-4 py-2
            rounded-xl
            border border-white/10
          "
        >
          Cancel
        </button>

        <button
          onClick={() =>
            handleDeleteEmployee(
              employeeToDelete
            )
          }
          className="
            px-4 py-2
            rounded-xl
            bg-red-600
            hover:bg-red-500
          "
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}

{selectedImage && (
  <div
    onClick={() =>
      setSelectedImage(null)
    }
    className="
      fixed inset-0 z-50
      bg-black/80
      backdrop-blur-sm
      flex items-center justify-center
      p-4
    "
  >
    <img
      src={selectedImage}
      alt="Profile"
      className="
        max-w-[500px]
        max-h-[500px]
        rounded-3xl
        border border-white/10
      "
    />
  </div>
)}

    </DashboardLayout>
  );
};

export default Employees;