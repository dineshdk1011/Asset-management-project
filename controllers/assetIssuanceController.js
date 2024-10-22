const { AssetIssuance, Employee, Asset } = require("../models"); // Adjust the path as necessary

// Issue an asset to an employee
exports.issueAsset = async (req, res) => {
  const { employeeId, assetId, issueDate } = req.body;
  try {
    const existingIssuance = await AssetIssuance.findOne({
      where: { assetId, status: "issued" },
    });
    if (existingIssuance) {
      return res
        .status(400)
        .json({ message: "Asset is already issued to another employee" });
    }

    const newIssuance = await AssetIssuance.create({
      employeeId,
      assetId,
      issueDate,
      status: "issued",
    });
    return res.status(201).json(newIssuance);
  } catch (error) {
    console.error("Asset is already issued to another employee", error);
    return res
      .status(500)
      .json({ message: "Asset is already issued to another employee" });
  }
};

// Return an asset from an employee
exports.returnAsset = async (req, res) => {
  const { returnDate, returnReason, id } = req.body;

  try {
    const issuance = await AssetIssuance.findByPk(id);
    if (!issuance) {
      return res.status(404).json({ message: "Asset issuance not found" });
    }
    await AssetIssuance.update(
      { returnDate, returnReason, status: "returned" },
      { where: { id } }
    );

    return res.status(200).json({ message: "Asset returned successfully" });
  } catch (error) {
    console.error("Error returning asset:", error);
    return res.status(500).json({ message: "Error returning asset" });
  }
};

// Scrap an asset
exports.scrapAsset = async (req, res) => {
  const { scrapReason, assetId } = req.body;
  try {
    const asset = await Asset.findByPk(assetId);
    if (!asset) {
      return res.status(404).json({ message: "Asset not found" });
    }
    await AssetIssuance.update(
      { scrapReason, status: "scrapped" },
      { where: { assetId } }
    );

    return res.status(200).json({ message: "Asset scrapped successfully" });
  } catch (error) {
    console.error("Error scrapping asset:", error);
    return res.status(500).json({ message: "Error scrapping asset" });
  }
};

// Get asset history
exports.getAssetHistory = async (req, res) => {
  const { assetId } = req.params;

  try {
    const history = await AssetIssuance.findAll({
      where: { assetId },
      include: [
        { model: Employee, attributes: ["name"] },
        { model: Asset, attributes: ["make", "model"] },
      ],
      order: [["issueDate", "DESC"]],
    });

    if (history.length === 0) {
      return res
        .status(404)
        .json({ message: "No history found for this asset" });
    }

    return res.status(200).json(history);
  } catch (error) {
    console.error("Error fetching asset history:", error);
    return res.status(500).json({ message: "Error fetching asset history" });
  }
};

// Get all asset issuances
exports.getAllIssuances = async (req, res) => {
  try {
    const issuances = await AssetIssuance.findAll({
      include: [
        { model: Employee, attributes: ["name"] },
        { model: Asset, attributes: ["make", "model"] },
      ],
      order: [["issueDate", "DESC"]],
    });

    return res.status(200).json(issuances);
  } catch (error) {
    console.error("Error fetching asset issuances:", error);
    return res.status(500).json({ message: "Error fetching asset issuances" });
  }
};
