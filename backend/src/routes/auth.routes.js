const express = require("express");

const {
  register,
  login,
  logout,
} = require("../controllers/auth.controller");

const {
  registerValidator,
  loginValidator,
} = require("../validators/auth.validator");

const router = express.Router();

router.post(
  "/register",
  registerValidator,
  register
);

router.post(
  "/login",
  loginValidator,
  login
);

router.post(
  "/logout",
  logout
);

module.exports = router;