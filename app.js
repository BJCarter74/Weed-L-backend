const express = require("express");
const https = require("https");
const fs = require("fs");
const { json } = express;
const sequelize = require("./config/database.js");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes.js");
const protectedRoutes = require("./routes/protectedRoutes.js");
const sessionRoutes = require("./routes/sessionRoutes.js");
const strainRoutes = require("./routes/strainRoutes.js");
const cookieParser = require("cookie-parser");

const app = express();

app.use(
  cors({
    origin: "https://127.0.0.1:5173", // Ensure CORS settings are appropriate for HTTPS
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(cookieParser());
app.use(json());
app.use("/auth", authRoutes);
app.use("/users", protectedRoutes);
app.use("/session", sessionRoutes);
app.use("/api", strainRoutes);

app.use((req, res, next) => {
  console.log("Received headers:", req.headers);
  next();
});

const PORT = 3000;

// Corrected Path to your SSL files
const key = fs.readFileSync(
  "D:/ERA Projects/Weed-L/localhost+2-key.pem",
  "utf8"
);
const cert = fs.readFileSync("D:/ERA Projects/Weed-L/localhost+2.pem", "utf8");

const httpsOptions = {
  key: key,
  cert: cert,
};

async function dbConnect() {
  try {
    await sequelize.sync();
    console.log("Database synchronized");

    // Create HTTPS server instead of using app.listen
    const httpsServer = https.createServer(httpsOptions, app);
    httpsServer.listen(PORT, () => {
      console.log(`HTTPS Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the application:", error);
  }
}

dbConnect();
