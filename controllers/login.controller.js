import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const handleLogin = async (req, res) => {
  const { name, password, email } = req.body;
  if (!name || !password || !email)
    return res
      .status(400)
      .json({ message: "Username ,email and password are required." });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, name: user.username, email: user.email }, // Payload (user info)
      process.env.JWT_SECRET, // Secret key
      { expiresIn: "1h" } // Token expiration time (1 hour)
    );

    // Send the token in a cookie
    res.cookie("token", token, {
      httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
      secure: process.env.NODE_ENV === "production", // Ensures cookie is sent only over HTTPS in production
      expires: new Date(Date.now() + 3600000), // Token expires in 1 hour (3600000 ms)
    });

    // Send response with user details (excluding password) and JWT token
    res.status(200).json({
      message: "Login successful",

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      redirect: "/mytasks", // Tells frontend where to go
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default handleLogin;
