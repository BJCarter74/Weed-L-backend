const Strain = require("../models/Strain");

exports.getAllStrains = async function (req, res) {
  try {
    const strains = await Strain.findAll();
    res.json(strains);
  } catch (error) {
    console.error("Error fetching strains:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getStrainById = async function (req, res) {
  try {
    const { id } = req.params;
    const strain = await Strain.findByPk(id);
    if (strain) {
      res.json(strain);
    } else {
      res.status(404).json({ error: "Strain not found" });
    }
  } catch (error) {
    console.error("Error fetching strain:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.searchStrains = async function (req, res) {
  try {
    const { keyword } = req.query;
    const strains = await Strain.findAll({
      where: {
        strain: { [Op.like]: `%${keyword}%` },
      },
    });
    if (strains.length) {
      res.json(strains);
    } else {
      res.status(404).json({ error: "No strains found matching the keyword" });
    }
  } catch (error) {
    console.error("Error searching strains:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
