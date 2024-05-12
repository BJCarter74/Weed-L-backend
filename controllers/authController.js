const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

exports.getUser = async (req, res) => {
  try {
    const userId = req.userId;
    console.log("userId", userId);

    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { password, ...userInfo } = user.toJSON();

    res.json(userInfo);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve user information" });
  }
};

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(409).json({ error: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Register Error:", error);
    res
      .status(500)
      .json({ error: "Registration failed", details: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("username", username);
    console.log("password", password);
    const user = await User.findOne({ where: { username: username } });
    console.log("username", username);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("isPasswordValid", isPasswordValid);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_TOKEN);
    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.REFRESH_TOKEN,
      { expiresIn: "7d" }
    );
    console.log("refresh", refreshToken);

    user.refreshToken = refreshToken;
    user.save();

    console.log("token", token);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 900000,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 450000,
    });

    res.json({ token });
    console.log("Logged In Successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Login failed" });
  }
};

exports.logout = async (req, res) => {
  try {
    const token = req.cookies.token;
    const refreshToken = req.cookies.refreshToken;
    console.log("Token:", token);
    console.log("Refresh Token:", refreshToken);

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_TOKEN, (err) => {
      if (err) {
        console.error("Token invalid:", err);
      }
    });

    res.clearCookie("token");
    res.clearCookie("refreshToken");

    res.json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ error: "Logout failed" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.userId;
    console.log("userId", userId);

    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.destroy();

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "User deletion failed" });
  }
};

exports.checkAuthStatus = async (req, res) => {
  try {
    console.log("Checking authentication status...");
    const token = req.cookies.token;
    console.log("Received token:", token);

    if (!token) {
      console.log("No token provided.");
      return res.status(401).json({ isAuthenticated: false });
    }

    jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
      if (err) {
        console.log("Token verification failed:", err);
        return res.status(401).json({ isAuthenticated: false });
      }
      console.log("Token is valid. User ID:", decoded.userId);
      return res.json({ isAuthenticated: true, userId: decoded.userId });
    });
  } catch (error) {
    console.error("Failed to verify authentication status", error);
    res.status(500).json({ isAuthenticated: false });
  }
};
