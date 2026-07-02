const { body } = require("express-validator");

const applyLeaveValidator = [
  body("leaveType")
    .notEmpty()
    .withMessage("Leave type is required"),

  body("fromDate")
    .notEmpty()
    .withMessage("From date is required")
    .isISO8601()
    .withMessage("Invalid from date"),

  body("toDate")
    .notEmpty()
    .withMessage("To date is required")
    .isISO8601()
    .withMessage("Invalid to date"),

  body("reason")
    .trim()
    .notEmpty()
    .withMessage("Reason is required"),
];

module.exports = {
  applyLeaveValidator,
};