import User from "../models/user-model.js";

 const checkUserStatus = async (req, res, next) => {
    try {
      const user = await User.findById(req.userId);
      if (user && user.status === 'blocked') {
        return res.status(403).json({ message: "Your account has been blocked. Contact support." });
      }
      next();
    } catch (error) {
      res.status(500).json({ message: "Error checking user status" });
    }
  };

  export default checkUserStatus
  