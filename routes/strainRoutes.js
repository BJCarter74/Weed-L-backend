const express = require("express");
const router = express.Router();
const {
  getAllStrains,
  getStrainById,
  searchStrains,
} = require("../controllers/strainController");

router.get("/strains", getAllStrains);

router.get("/strains/:id", getStrainById);

router.get("/strains/search", searchStrains);

module.exports = router;
