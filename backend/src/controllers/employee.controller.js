const User = require("../models/User");
const Leave = require("../models/Leave");

const getEmployees = async (req, res) => {
  try {
    const employees = await User.find({
      role: "employee",
    }).select("-password");

    return res.status(200).json({
      success: true,
      data: employees,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const createEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      department,
      designation,
    } = req.body;

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message:
          "Employee already exists",
      });
    }

    const lastEmployee =
  await User.findOne({
    employeeId: { $exists: true },
  })
    .sort({ employeeId: -1 })
    .select("employeeId");

let nextEmployeeId = "EMP001";

if (lastEmployee?.employeeId) {
  const lastNumber = parseInt(
    lastEmployee.employeeId.replace(
      "EMP",
      ""
    ),
    10
  );

  nextEmployeeId = `EMP${String(
    lastNumber + 1
  ).padStart(3, "0")}`;
}

    const employee = await User.create({
      name,
      email,
      password,
      department,
      designation,
      role: "employee",
      employeeId: nextEmployeeId,
    });

    return res.status(201).json({
      success: true,
      data: employee,
    });
  } catch (error) {
  console.error(error);

  if (error.name === "ValidationError") {
    const firstError =
      Object.values(error.errors)[0];

    return res.status(400).json({
      success: false,
      message:
        firstError.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
}
};

const deleteEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;

    const employee =
      await User.findById(employeeId);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    await Leave.deleteMany({
      employee: employeeId,
    });

    await User.findByIdAndDelete(
      employeeId
    );

    return res.status(200).json({
      success: true,
      message:
        "Employee and all related data deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getEmployeeById = async (
  req,
  res
) => {
  try {
    const employee =
      await User.findById(
        req.params.id
      ).select("-password");

    if (!employee) {
      return res.status(404).json({
        success: false,
        message:
          "Employee not found",
      });
    }

    const leaves =
      await Leave.find({
        employee: employee._id,
      }).sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      data: {
        employee,
        leaves,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Internal Server Error",
    });
  }
};

const updateEmployeeJobDetails = async (
  req,
  res
) => {
  try {
    const {
      department,
      designation,
    } = req.body;

    const employee =
      await User.findById(
        req.params.id
      );

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    employee.department =
      department?.trim() || "";

    employee.designation =
      designation?.trim() || "";

    await employee.save();

    return res.status(200).json({
      success: true,
      message:
        "Employee details updated successfully",
      data: employee,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Internal Server Error",
    });
  }
};

module.exports = {
  getEmployees,
  createEmployee,
  deleteEmployee,
  getEmployeeById,
  updateEmployeeJobDetails,
};