const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    // Get token from header
    const authHeader = req.headers.authorization;
    // Check if token exists
    if (!authHeader) {
        res.status(401).json({ message: "No token, authorization denied" });
    } else {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(403).json({ message: "Token is not valid" });
            } else {
                next();
            }
        });
    }
};
