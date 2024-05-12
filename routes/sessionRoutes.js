const express = require("express");
const sessionController = require("../controllers/sessionController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post(
  "/createsession",
  authMiddleware.verifyToken,
  sessionController.createSession
);
router.get(
  "/sessions",
  authMiddleware.verifyToken,
  sessionController.getUserSessions
);
router.delete(
  "/deletesessions/:id",
  authMiddleware.verifyToken,
  sessionController.deleteSession
);

module.exports = router;
