import jwt from "jsonwebtoken";
export const authenticate = (req, res, next) => {
    const token = req.cookies?.access_token;
    if (!token) {
        return res.status(401).json({
            message: "Authentication required"
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            id: decoded.userId
        };
        next();
    }
    catch {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};
