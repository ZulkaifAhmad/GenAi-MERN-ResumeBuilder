import jwt from "jsonwebtoken";
import BlockList from "../model/blockList.model.js";

/**
 * @description Authentication middleware (Protected Route)Checks if user has a valid JWT (JSON Web Token). If valid, allows access to the next route. If invalid or missing, returns an unauthorized response.
 * @param {object} express req object (expect token in cookies)
 * @param {object} express res object
 * @param {function} next - next the middlware function
 */

async function Protected(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      console.log("user have no token , please login first");
      return res.status(404).json({
        message: "user have no token , Please login first",
      });
    }
    const checkIfBlockListed = await BlockList.findOne({ token: token });
    if (checkIfBlockListed) {
      return res.status(303).json({
        message: "Please try new Login , your this token i already blocked",
      });
    }
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verifyToken;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message || error,
      error: error,
    });
  }
}

export { Protected };
