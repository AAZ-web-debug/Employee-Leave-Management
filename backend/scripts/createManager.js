require("dotenv").config();

const mongoose = require("mongoose");
const readline = require("readline");

const User = require("../src/models/User");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = (question) =>
  new Promise((resolve) =>
    rl.question(question, resolve)
  );

async function generateEmployeeId() {
  const lastManager = await User.findOne({
    employeeId: /^EMP/,
  })
    .sort({ createdAt: -1 })
    .select("employeeId");

  if (!lastManager?.employeeId) {
    return "EMP001";
  }

  const num = parseInt(
    lastManager.employeeId.replace("EMP", ""),
    10
  );

  return `EMP${String(num + 1).padStart(3, "0")}`;
}

async function createManager() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("\n=== Create Manager Account ===\n");

    const name = await ask("Name: ");
    const email = await ask("Email: ");
    const password = await ask("Password: ");
    const department = await ask("Department: ");
    const designation = await ask("Designation: ");

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      console.log("\n❌ User already exists.");
      process.exit(0);
    }

    const employeeId = await generateEmployeeId();

    const manager = await User.create({
      name,
      email,
      password,
      department,
      designation,
      role: "manager",
      employeeId,
    });

    console.log("\n✅ Manager created successfully!");
    console.log(`Employee ID: ${manager.employeeId}`);
    console.log(`Email: ${manager.email}`);

    process.exit(0);
  } catch (error) {
    console.error("\n❌ Error creating manager:");
    console.error(error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

createManager();