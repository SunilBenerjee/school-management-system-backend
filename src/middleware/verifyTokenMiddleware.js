import Token from "../model/tokenModel.js";
import User from "../model/userModel.js";

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: Token missing" });
    }
    const token = authHeader.split(" ")[1];
    const tokenDoc = await Token.findOne({ token });
    if (!tokenDoc) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    if (tokenDoc.expires_at < new Date()) {
      return res.status(401).json({ message: "Token expired" });
    }
    const user = await User.findById(tokenDoc.user_id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default verifyToken;
