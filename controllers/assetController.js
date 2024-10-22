const { Asset } = require("../models");

exports.getAllAssets = async (req, res) => {
  try {
    await Asset.findAll()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.json({
          status: 400,
          message: err.message,
        });
      });
  } catch (error) {
    res.json({
      status: 400,
      message: error.message,
    });
  }
};

exports.addAsset = async (req, res) => {
  try {
    const { serialNumber, make, model, type, uniqueId, branch, value } =
      req.body;
    await Asset.create({
      serialNumber,
      make,
      model,
      type,
      uniqueId,
      branch,
      value,
    })
      .then((data) => {
        res.json({
          status: 200,
          message: "SUCCESS",
          data: data,
        });
      })
      .catch((err) => {
        res.json({
          status: 400,
          message: err.message,
        });
      });
  } catch (error) {
    res.json({
      status: 400,
      message: error.message,
    });
  }
};

exports.editAsset = async (req, res) => {
  try {
    const { id } = req.params;
    const { serialNumber, make, model, type, status, branch, value } = req.body;

    await Asset.update(
      { serialNumber, make, model, type, status, branch, value },
      { where: { id } }
    )
      .then(() => {
        res.send("Updated Successfully");
      })
      .catch((err) => {
        res.json({
          status: 400,
          message: err.message,
        });
      });
  } catch (error) {
    res.json({
      status: 400,
      message: error.message,
    });
  }
};

exports.ViewAsset = async (req, res) => {
  try {
    const { id } = req.params;
    await Asset.findAll({
      where: { id: id },
    })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.json({
          status: 400,
          message: err.message,
        });
      });
  } catch (error) {
    res.json({
      status: 400,
      message: error.message,
    });
  }
};

exports.deleteAsset = async (req, res) => {
  const { id } = req.params;
  await Asset.destroy({ where: { id } })
    .then(() => {
      res.send("Deleted Successfully");
    })
    .catch((err) => {
      res.json({
        status: 400,
        message: err.message,
      });
    });
};

exports.stockAsset = async (req, res) => {
  await await Asset.findAll({
    where: { status: "Available" },
  })
    .then((assets) => res.json(assets))
    .catch((error) => res.status(500).json({ error }));
};
