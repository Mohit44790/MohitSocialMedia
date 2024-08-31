import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token; // Make sure your cookies parser middleware is set up in Express
    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }
    req.id = decoded.userId; // Attach the user ID to the request object
    next();
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Authentication failed", error: error.message });
  }
};

export default isAuthenticated;
