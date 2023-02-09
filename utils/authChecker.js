const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let token = req.headers.authorization;
  token = token.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "token is required" });
  }
  try {
    const payload = jwt.verify(token, "TOKEN_SECRET");
    req.user = payload;
    console.log(req.user);
    res.json({ message: "ok" });
  } catch (err) {
    return res.status(401).json({ error: "token is not valid" });
  }
  next();
};
