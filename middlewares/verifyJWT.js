import jwt from "jsonwebtoken";

const verifyJWT = (req, res, next) => {
  const token = req.cookies?.token; // ✅ Read from cookies
  console.log("Token from cookies:", req.cookies?.token);
  if (!token) return res.status(401).json({ error: "Unauthorized" }); // Unauthorized

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); // Forbidden (Invalid token)

    req.username = decoded.name; // ✅ Store decoded info
    req.userId = decoded.id;

    next();
  });
};

export default verifyJWT;
