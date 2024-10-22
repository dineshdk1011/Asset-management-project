const { Employee } = require("../models");

exports.getAllEmployees = async (req, res) => {
  try {
    await Employee.findAll()
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

exports.addEmployee = async (req, res) => {
  try {
    const { name, email, active } = req.body;
    await Employee.create({ name, email, active })
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

exports.editEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, active } = req.body;

    await Employee.update({ name, email, active }, { where: { id } })
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

exports.ViewEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    await Employee.findAll({
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

exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;
  await Employee.destroy({ where: { id } })
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
