const dotenv = require("dotenv");

dotenv.config();

const app = require("./app");
const connectDB = require("./config/db");

const employeeRoutes = require(
  "./routes/employee.routes"
);

const PORT = process.env.PORT || 5000;

app.use(
  "/api/employees",
  employeeRoutes
);

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`);
  });
};

startServer();