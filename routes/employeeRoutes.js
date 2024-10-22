const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");

router.get("/", employeeController.getAllEmployees);
router.post("/add", employeeController.addEmployee);
router.get("/view/:id", employeeController.ViewEmployee);
router.post("/edit/:id", employeeController.editEmployee);
router.post("/delete/:id", employeeController.deleteEmployee);

module.exports = router;
