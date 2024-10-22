const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/assetController");

router.get("/", employeeController.getAllAssets);
router.post("/add", employeeController.addAsset);
router.get("/view/:id", employeeController.ViewAsset);
router.post("/edit/:id", employeeController.editAsset);
router.post("/delete/:id", employeeController.deleteAsset);
router.get("/stock", employeeController.stockAsset);

module.exports = router;
