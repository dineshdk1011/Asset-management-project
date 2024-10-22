const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/assetCategoryController");

router.get("/", employeeController.getAllAssetCategorys);
router.post("/add", employeeController.addAssetCategory);
router.get("/view/:id", employeeController.ViewAssetCategory);
router.post("/edit/:id", employeeController.editAssetCategory);
router.post("/delete/:id", employeeController.deleteAssetCategory);

module.exports = router;
