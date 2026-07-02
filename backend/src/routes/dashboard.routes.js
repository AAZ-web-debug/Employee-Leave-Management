const express = require("express");

const {
  employeeDashboard,
  managerDashboard,
  publicStats,
} = require("../controllers/dashboard.controller");

const {
  protect,
} = require("../middleware/auth.middleware");

const authorize = require(
  "../middleware/role.middleware"
);

const router = express.Router();

router.get(
  "/public-stats",
  publicStats
);

router.get(
  "/employee",
  protect,
  authorize("employee"),
  employeeDashboard
);

router.get(
  "/manager",
  protect,
  authorize("manager"),
  managerDashboard
);

module.exports = router;