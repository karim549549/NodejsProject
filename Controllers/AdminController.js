/* import path from 'path';
import fs from 'fs/promises';
import AppError from "../Utils/AppError.js";
import  AsyncWrapper  from '../utils/AsyncWrapper.js';


const ClearLogs = AsyncWrapper(
    async (req, res,next) => {
        const errorLogPath = path.join(__dirname, 'logs', 'error.log');
        const combinedLogPath = path.join(__dirname, 'logs', 'combined.log');
        if(!errorLogPath || !combinedLogPath) {
            return next( AppError(404, 'Log Files not found', null, 'failed'));
        }
        await Promise.all([
            fs.truncate(errorLogPath, 0),
            fs.truncate(combinedLogPath, 0),
        ]);
        return next( new AppError(200, 'Logs cleared',null,'success'));
    }
);

export default {
    ClearLogs
}
 */