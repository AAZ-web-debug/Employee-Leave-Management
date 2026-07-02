const { validationResult } = require("express-validator");

const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const register = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    const totalUsers = await User.countDocuments();

const employeeId = `EMP${String(
  totalUsers + 1
).padStart(3, "0")}`;

const user = await User.create({
  name,
  email,
  password,
  employeeId,
});

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
  id: user._id,
  employeeId: user.employeeId,
  name: user.name,
  email: user.email,
  role: user.role,
  profileImage: user.profileImage,
},
    });
  } catch (error) {
  console.error(error);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
}
};

const login = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    user.lastLogin = new Date();
    await user.save();

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
      id: user._id,
      employeeId: user.employeeId,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage,
    },
    });
  } catch (error) {
  console.error(error);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
}
};

const logout = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};

module.exports = {
  register,
  login,
  logout,
};