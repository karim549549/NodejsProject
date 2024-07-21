import logger from "../Utils/Loggers.js";


const logging = () => (req, res, next) => {
    const oldWriteHead = res.writeHead;
    res.writeHead = (...args) => {
        const statusCode = args[0];
        const logStream = statusCode >= 400 ? "error" : "info";
        logger[logStream](`${req.method} ${req.url} ${statusCode}`);
        return oldWriteHead.apply(res, args);
    };
    next();
}

export default logging;