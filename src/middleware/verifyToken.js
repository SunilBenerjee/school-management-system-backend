import Token from "../models/TokenModal.js";
import User from "../models/UserModal.js";

/**
 * Middleware to verify token and directly return the user
 */
const verifyToken = async (req, res) => {
  try {
    // 1️⃣ Get token from headers
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: Token missing" });
    }

    const token = authHeader.split(" ")[1];

    // 2️⃣ Find token in the database
    const tokenDoc = await Token.findOne({ token });
    if (!tokenDoc) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    // 3️⃣ Check if token is expired
    if (tokenDoc.expires_at < new Date()) {
      return res.status(401).json({ message: "Token expired" });
    }

    // 4️⃣ Find user by user_id
    const user = await User.findById(tokenDoc.user_id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 5️⃣ Return user directly
    return res.status(200).json({
      message: "Token verified successfully",
      user,
    });
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default verifyToken;
