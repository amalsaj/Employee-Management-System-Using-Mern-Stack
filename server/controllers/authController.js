const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  // Get the token from cookies
  console.log("req.cookies: ", req.cookies['token']);
  const cookieToken = req.cookies.token;
  console.log("cookieToken:", cookieToken);
  if (!cookieToken) {
    console.log("Token is not provided");
    return res
      .status(401)
      .json({ message: "Unauthorized - Token is not provided" });
  }

  // Verify the token
  jwt.verify(cookieToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        console.error("Token has expired");
        return res.redirect("/");
      } else {
        console.error("Token verification failed:", err);
        return res
          .status(401)
          .json({ message: "Unauthorized - Invalid token" });
      }
    }
    console.log(`Authorized - Valid token: ${cookieToken}`);
    req.user = decoded;
    next();
  });
};

module.exports = { authenticateUser };
