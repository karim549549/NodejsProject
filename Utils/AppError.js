// utils/AppError.js
class AppError extends Error {
    constructor(statusCode, message, data = [], statusText = 'error') {
        super(message);
        this.statusCode = statusCode;
        this.data = data;
        this.statusText = statusText;
    }

}

export default AppError;
