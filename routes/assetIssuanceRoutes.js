const express = require("express");
const assetIssuanceController = require("../controllers/assetIssuanceController");

const router = express.Router();

router.post("/asset-issuances", assetIssuanceController.issueAsset);

router.post("/asset-issuances/return", assetIssuanceController.returnAsset);

router.post("/asset-issuances/scrap", assetIssuanceController.scrapAsset);

router.get(
  "/asset-issuances/:assetId/history",
  assetIssuanceController.getAssetHistory
);

router.get("/asset-issuances", assetIssuanceController.getAllIssuances);

module.exports = router;
