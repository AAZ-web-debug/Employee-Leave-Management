const User = require("../models/User");
const Leave = require("../models/Leave");

const employeeDashboard = async (req, res) => {
  try {
    const totalLeaves = await Leave.countDocuments({
      employee: req.user._id,
    });

    const approvedLeaves = await Leave.countDocuments({
      employee: req.user._id,
      status: "approved",
    });

    const pendingLeaves = await Leave.countDocuments({
      employee: req.user._id,
      status: "pending",
    });

    const rejectedLeaves = await Leave.countDocuments({
      employee: req.user._id,
      status: "rejected",
    });

    return res.status(200).json({
      success: true,
      data: {
        totalLeaves,
        approvedLeaves,
        pendingLeaves,
        rejectedLeaves,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const managerDashboard = async (req, res) => {
  try {
    const totalEmployees = await User.countDocuments({
      role: "employee",
    });

    const totalLeaveRequests =
      await Leave.countDocuments();

    const pendingRequests =
      await Leave.countDocuments({
        status: "pending",
      });

    const approvedRequests =
      await Leave.countDocuments({
        status: "approved",
      });

    const rejectedRequests =
      await Leave.countDocuments({
        status: "rejected",
      });

    return res.status(200).json({
      success: true,
      data: {
        totalEmployees,
        totalLeaveRequests,
        pendingRequests,
        approvedRequests,
        rejectedRequests,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const publicStats = async (req, res) => {
  try {
    const totalEmployees = await User.countDocuments({
      role: "employee",
    });

    const totalLeaveRequests =
      await Leave.countDocuments();

    const pendingRequests =
      await Leave.countDocuments({
        status: "pending",
      });

    const approvedRequests =
      await Leave.countDocuments({
        status: "approved",
      });

    return res.status(200).json({
      success: true,
      data: {
        totalEmployees,
        totalLeaveRequests,
        pendingRequests,
        approvedRequests,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  employeeDashboard,
  managerDashboard,
  publicStats,
};