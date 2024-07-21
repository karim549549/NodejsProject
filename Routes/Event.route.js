import express from "express"
import verifyToken from "../Middleware/VerfiyToken.js";
import EventController from "../Controllers/EventController.js";
import cacheMiddleware from "../Middleware/Caching.js";
import Allow from "../Middleware/AllowedTo.js";
import Roles from "../Utils/MagicStrings.js";
import  Schema  from "../Utils/Validation-Schemas.js";
import  Validate  from "../Middleware/Validation.js";
const route = express.Router();

route.route('/')
    .get(verifyToken,Allow(Roles.Roles.ADMIN),cacheMiddleware(),EventController.GetEvents)
    .post(verifyToken,Validate(Schema.EventSchema),Allow(Roles.Roles.ADMIN),EventController.CreateEvent);
route.route('/:eventid')
    .get(verifyToken,Allow(Roles.Roles.ADMIN),cacheMiddleware(),EventController.GetEvent)
    .patch(verifyToken,Validate(Schema.EventSchema),Allow(Roles.Roles.ADMIN),EventController.UpdateEvent)
    .delete(verifyToken,Allow(Roles.Roles.ADMIN),EventController.DeleteEvent);

route.post('/book/:eventid', verifyToken, EventController.BookEvent);

route.patch('/cancel/:eventid',verifyToken, EventController.UnBookEvent);

    export default route