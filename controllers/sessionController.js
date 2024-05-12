const Session = require("../models/Session.js");

exports.createSession = async (req, res) => {
  try {
    console.log("Received session data:", req.body);
    const { title, description, date, consumptionMethods, rating } = req.body;

    const session = await Session.create({
      title,
      description,
      date,
      consumptionMethods,
      rating,
      UserId: req.userId,
    });

    res.status(201).json(session);
  } catch (error) {
    console.error("Error creating session:", error);
    res.status(500).json({ error: "Failed to create session" });
  }
};

exports.getUserSessions = async (req, res) => {
  try {
    const session = await Session.findAll({
      where: { UserId: req.userId },
    });
    res.json(session);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve Sessions" });
  }
};

exports.deleteSession = async (req, res) => {
  try {
    const { id } = req.params;
    const session = await Session.findOne({
      where: { id, UserId: req.userId },
    });

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    await session.destroy();
    res.json({ message: "Session deleted successfully" });
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ error: "Failed to delete session" });
  }
};
