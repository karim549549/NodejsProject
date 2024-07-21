import jwt from 'jsonwebtoken';
import AppError from "../Utils/AppError.js";

export default (req, res, next) => {
    // 1. Getting token and check if it's there
    try {
        const token = req.headers["authorization"] || req.headers["Authorization"];
        if (!token) {
            return next(new AppError(401,'Token not found', null, 'failed'));
        }
        const User = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        req.user = User;
        
        next();
    } catch (error) {
        return next(new AppError(401,'Token not found', null, 'failed'));
    }
};
