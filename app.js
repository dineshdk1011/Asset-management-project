const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const { Sequelize } = require("sequelize");
const config = require("./config/config.json")[
  process.env.NODE_ENV || "development"
];

// Import routes
const employeeRoutes = require("./routes/employeeRoutes");
const assetRoutes = require("./routes/assetRoutes");
const assetCategoryRoutes = require("./routes/assetCategoryRoutes");
const assetIssuanceRoutes = require("./routes/assetIssuanceRoutes");

// Initialize the express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    dialectOptions: config.dialectOptions || {},
    port: config.port || 5432,
  }
);

app.get("/", (req, res) => {
  res.render("employees");
});

app.get("/assets", (req, res) => {
  res.render("assets");
});
app.get("/categories", (req, res) => {
  res.render("categories");
});
app.get("/stock", (req, res) => {
  res.render("stock");
});
app.get("/issue", (req, res) => {
  res.render("issue_asset");
});
app.get("/return", (req, res) => {
  res.render("return_asset");
});
app.get("/scrap", (req, res) => {
  res.render("scrap_asset");
});
app.get("/history", (req, res) => {
  res.render("sset_history");
});

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

sequelize.sync({ alter: true });

// Use Routes
app.use("/api/employees", employeeRoutes);
app.use("/api/assets", assetRoutes);
app.use("/api/asset-categories", assetCategoryRoutes);
app.use("/api/asset-issuance", assetIssuanceRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
