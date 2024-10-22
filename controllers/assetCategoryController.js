const { AssetCategory } = require("../models");

exports.getAllAssetCategorys = async (req, res) => {
  try {
    await AssetCategory.findAll()
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

exports.addAssetCategory = async (req, res) => {
  try {
    const { name } = req.body;
    await AssetCategory.create({ name })
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

exports.editAssetCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    await AssetCategory.update({ name }, { where: { id } })
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

exports.ViewAssetCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await AssetCategory.findAll({
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

exports.deleteAssetCategory = async (req, res) => {
  const { id } = req.params;
  await AssetCategory.destroy({ where: { id } })
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
