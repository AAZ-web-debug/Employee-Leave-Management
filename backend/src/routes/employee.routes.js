const express = require("express");

const {
  getEmployees,
  createEmployee,
  deleteEmployee,
  getEmployeeById,
  updateEmployeeJobDetails,
} = require("../controllers/employee.controller");

const {
  protect,
} = require("../middleware/auth.middleware");

const authorize = require(
  "../middleware/role.middleware"
);

const router = express.Router();

router.use(
  protect,
  authorize("manager")
);

router.get("/", getEmployees);

router.get("/:id", getEmployeeById);

router.post("/", createEmployee);

router.patch(
  "/:id/job-details",
  updateEmployeeJobDetails
);

router.delete("/:id", deleteEmployee);

module.exports = router;