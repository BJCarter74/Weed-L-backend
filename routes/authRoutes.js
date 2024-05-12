const express = require("express");
const authController = require("../controllers/authController.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.delete(
  "/deleteaccount",
  authMiddleware.verifyToken,
  authController.deleteUser
);
router.post("/logout", authMiddleware.verifyToken, authController.logout);
router.get("/status", authController.checkAuthStatus);
module.exports = router;
