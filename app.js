import express from "express";
import mongoose from "mongoose";

import 'dotenv/config';
import cors from "cors";
import UserRouter from "./Routes/User.route.js";
import EventRouter from "./Routes/Event.route.js";
/* import AdminRouter from "./Routes/Admin.route.js"; */
import logger from "./Utils/Loggers.js";
import { rateLimit } from 'express-rate-limit';


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    message: 'Too many requests, please try again later.',
});

const app = express();

const url = process.env.MONGO_URL;
mongoose.connect(url).then(() => console.log("DB connected")).catch((err) => console.log(err));

app.use(express.json()); 
app.use(cors()); 
app.use(limiter); 


app.use('/api/user', UserRouter);
app.use('/api/event', EventRouter);
/* app.use('/api/admin', AdminRouter);
 */
app.all("*", (req, res) => {
    res.status(404).json({
        status: "error",
        message: "Not Found",
        data: []
    });
});


app.use((error, req, res, next) => {
    logger.error(`${req.method} ${req.originalUrl} ${error.message}`, { stack: error.stack });
    res.status(error.statusCode || 500).json({
        status: error.statusText || 'error',
        message: error.message || 'Internal Server Error',
        data: error.data || []
    });
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Started on port 3000");
});
