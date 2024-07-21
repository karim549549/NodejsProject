import winston from "winston";

const { combine, timestamp, label, prettyPrint } = winston.format;


const Logger = winston.createLogger({
    level : 'info',
    format : combine(
        timestamp(),
        prettyPrint()
    ),
    transports : [
        new winston.transports.File({ filename : 'error.log', level : 'error' }),
        new winston.transports.File({ filename : 'combined.log', level : 'info' }),
    ],
    exitOnError : false
});



export default Logger