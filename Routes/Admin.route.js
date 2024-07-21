/* import express from "express";
import AdminController from "../Controllers/AdminController.js";4
import verifyToken from "../Middleware/VerfiyToken.js";
import Allow from "../Middleware/AllowedTo.js";
import cacheMiddleware from "../Middleware/Caching.js";
import Magic from "../Utils/MagicStrings.js";


const route=  express.Router();

route.route('/clear-logs')
    .delete(verifyToken,Allow(Magic.Roles.ADMIN),AdminController.ClearLogs)

export default route; */