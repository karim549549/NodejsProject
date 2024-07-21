import express from "express";
import UserController from "../Controllers/UserController.js";
import VerifyToken from "../Middleware/VerfiyToken.js";
import Allow from "../Middleware/AllowedTo.js";
import Magic from "../Utils/MagicStrings.js";
import Validation from "../Middleware/Validation.js";
import Schema from "../Utils/Validation-Schemas.js";
import cacheMiddleware from "../Middleware/Caching.js";


const route = express.Router();

route.route('/')
    .get(VerifyToken, Allow(Magic.Roles.ADMIN), cacheMiddleware(), UserController.GetAllUsers);

route.route('/Login')
    .post(UserController.Login);

route.route('/Register')
    .post(Validation(Schema.UserSchema), UserController.Register);

route.route('/:userid')
    .delete(VerifyToken, Allow(Magic.Roles.ADMIN), Validation(Schema.UserSchema), UserController.DeleteUser)
    .patch(VerifyToken, Validation(Schema.UserSchema), UserController.UpdateUser);

route.get('/userevent', VerifyToken, cacheMiddleware(), UserController.GetUserEvents);


export default route;
