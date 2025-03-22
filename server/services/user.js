const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if (username.length < 5) {
      return res.status(400).json({ error: "username must have 5 characters" });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: "password must have 6 characters" });
    }

    const checkUsers = await User.findOne({ $or: [{ email }, { username }] });
    if (checkUsers) {
      console.log(username, email);
      return res
        .status(400)
        .json({ error: "username or email already exists" });
    } else {
      const newUser = new User({ username, email, password });
      await newUser.save();
      return res.status(200).json({ success: "Registration successfull" });
    }
  } catch (error) {
    console.error("Registration Error:", error);
    return res.status(500).json({ error: "Internal server error!" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      bcrypt.compare(password, checkUser.password, (err, data) => {
        if (data) {
          const token = jwt.sign(
            { id: checkUser._id, email: checkUser.email },
            process.env.JWT_SECRET,
            {
              expiresIn: "30d",
            }
          );
          res.cookie("taskifyUserToken", token, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
          });
          console.log("Setting cookie:", token);
          return res.status(200).json({ success: "Login Successfull" });
        } else {
          return res.status(400).json({ error: "Invalid Credentials" });
        }
      });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("taskifyUserToken", {
      httpOnly: true,
    });
    res.json({ message: "Logged Out" });
  } catch (error) {
    return res.status(404).json({ error: "Internal server error" });
  }
};

const userDetails = async (req, res) => {
  try {
    const { user } = req;
    const getDetails = await User.findById(user._id)
      .populate("tasks")
      .select("-password");
    console.log(getDetails)
    
    if (getDetails) {
      const allTasks = getDetails.tasks;
      let yetToStart = [];
      let inProgress = [];
      let completed = [];
      allTasks.map((item) => {
        if (item.status === "yetToStart") {
          yetToStart.push(item);
        } else if (item.status === "inProgress") {
          inProgress.push(item);
        } else {
          completed.push(item);
        }
      });
      return res
        .status(200)
        .json({
          success: "success",
          tasks: [{ yetToStart }, { inProgress }, { completed }],
        });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: "Internal server error" });
  }
};

module.exports = { register, login, logout, userDetails };
