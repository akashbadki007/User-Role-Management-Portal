const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({ success: false, msg: "Access denied, no token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded data (payload) to the request object
        next();
    } catch (err) {
        console.error("Token verification error:", err);
        return res.status(403).json({ success: false, msg: "Invalid token" });
    }
};

exports.isAdmin = (req, res, next) => {
    if (req.user?.role !== "Admin") {
        return res.status(403).json({ success: false, msg: "Access denied. This route is restricted to admins only." });
    }
    next();
};

exports.isCustomer = (req, res, next) => {
    if (req.user?.role !== "Customer") {
        return res.status(403).json({ success: false, msg: "Access denied. This route is restricted to customers only." });
    }
    next();
};
