import jwt from "jsonwebtoken";

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401); // Unauthorized

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => { // ✅ Use correct secret
    if (err) return res.sendStatus(403); // Forbidden (Invalid token)

    req.username = decoded.name; // ✅ Match JWT payload structure
    req.userId = decoded.id; // ✅ Store user ID if needed

    next();
  });
};

export default verifyJWT;
