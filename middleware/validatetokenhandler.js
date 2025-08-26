const asynchandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validatetoken = asynchandler(async (req, res, next) => {
  let token;
  // Correct property name and check for both casing
  let authHeader = req.headers.authorization || req.headers.Authorization;

  // Correct logical operator (&&) and standard "Bearer" casing
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    
    // Verify the token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      // If the token is invalid or expired
      if (err) {
        res.status(401); // 401 Unauthorized for bad token
        throw new Error("User is not authorized or token is expired");
      }
      
      // If the token is valid, attach the user info to the request object
      req.user = decoded.user;
      next(); // Pass control to the next middleware or route handler
    });
  } else {
    // If no token is found in the header
    res.status(401);
    throw new Error("No token found in the request header");
  }
});

module.exports = validatetoken;
