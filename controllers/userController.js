import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);
  try {
    const existingUser = await User.findOne({ email });
    console.log("existingUser", existingUser);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const lowerEmail = email.toLowerCase();
    const newUser = new User({
      username,
      email: lowerEmail,
      password: hashedPassword,
    });

    const resp = await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.SECRET);
    res.status(201).json({ token, user: { id: newUser._id, username, email } });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const lowerEmail = email.toLowerCase();

  try {
    const user = await User.findOne({ email: lowerEmail });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    console.log(user);
    console.log(password, user.password);
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET);
    res
      .status(200)
      .json({
        token,
        user: { id: user._id, username: user.username, email: user.lowerEmail },
      });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export { registerUser, loginUser };
