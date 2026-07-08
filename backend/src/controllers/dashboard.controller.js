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

const getAvailability = async (req, res) => {
  try {
    const date = req.query.date
      ? new Date(req.query.date)
      : new Date();

    date.setHours(0, 0, 0, 0);

    const employeesOnLeave =
  await Leave.find({
    status: "approved",
    fromDate: { $lte: date },
    toDate: { $gte: date },
  }).populate(
    "employee",
    "name employeeId department designation profileImage"
  );

    const leaveEmployeeIds =
      employeesOnLeave.map(
        (leave) =>
          leave.employee?._id?.toString()
      );

    const allEmployees =
      await User.find({
        role: "employee",
      }).select(
        "name employeeId department designation profileImage"
      );

    const onDutyEmployees =
      allEmployees.filter(
        (employee) =>
          !leaveEmployeeIds.includes(
            employee._id.toString()
          )
      );

    res.status(200).json({
  success: true,
  data: {
    totalEmployees: allEmployees.length,
    onDutyCount: onDutyEmployees.length,
    onLeaveCount: employeesOnLeave.length,
    onDutyEmployees,
    onLeaveEmployees:
      employeesOnLeave.map((leave) => ({
        ...leave.employee.toObject(),
        leaveType: leave.leaveType,
      })),
  },
});
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch availability",
    });
  }
};

module.exports = {
  employeeDashboard,
  managerDashboard,
  publicStats,
  getAvailability,
};