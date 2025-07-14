import jwt from "jsonwebtoken";

// Admin authentication middleware
const authAdmin = (req, res, next) => {
  try {
    // Expect token in `Authorization` header or `atoken`
    const authHeader = req.headers.authorization || req.headers.atoken;
    if (!authHeader) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized. Token missing." });
    }

    // Handle "Bearer <token>" format
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ensure the token belongs to the admin
    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized. Invalid admin." });
    }

    next();
  } catch (error) {
    console.error("AuthAdmin error:", error);
    return res
      .status(401)
      .json({ success: false, message: "Not authorized. " + error.message });
  }
};

export default authAdmin;
