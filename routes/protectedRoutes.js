const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/profile", authMiddleware.verifyToken, (req, res) => {
  res.json({ message: "Protected route accessed successfully" });
});

module.exports = router;
