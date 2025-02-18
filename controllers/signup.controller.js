import User from "../models/user.js";
import jwt from "jsonwebtoken";

const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the email is already in use
    const duplicate = await User.findOne({ email });
    if (duplicate) {
      return res.status(409).json({ error: "Email already in use" });
    }

    // Create a new user (password will be hashed automatically in the model)
    const newUser = await User.create({ name, email, password });

    // Generate a JWT token for the newly created user
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email }, // Payload (user info)
      process.env.JWT_SECRET, // Secret key
      { expiresIn: "1h" } // Token expiration time (1 hour)
    );

    // Send the token in a cookie
    res.cookie("token", token, {
      httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
      secure: process.env.NODE_ENV === "production", // Ensures cookie is sent only over HTTPS in production
      expires: new Date(Date.now() + 3600000), // Token expires in 1 hour (3600000 ms)
    });

    // Send response with user details
    res.status(201).json({
      message: "User created and logged in successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default signUp;
