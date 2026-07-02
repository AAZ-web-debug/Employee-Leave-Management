const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
  type: String,
  required: [true, "Password is required"],
  minlength: [
    6,
    "Password must be at least 6 characters long",
  ],
},

    role: {
      type: String,
      enum: ["employee", "manager"],
      default: "employee",
    },

    department: {
      type: String,
      default: "",
      trim: true,
    },

    designation: {
      type: String,
      default: "",
      trim: true,
    },

    employeeId: {
  type: String,
  unique: true,
  sparse: true,
},

phone: {
  type: String,
  default: "",
  trim: true,
},

manager: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  default: null,
},

annualLeaveBalance: {
  type: Number,
  default: 20,
},

    profileImage: {
      type: String,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);