
import AppError from "../Utils/AppError.js";


import AsyncWrapper  from "../utils/AsyncWrapper.js";const validateRequest = (schema) => {
    return AsyncWrapper(async (req, res, next) => {
        try {
            const value = await schema.validateAsync(req.body, { abortEarly: false });
            req.body = value;
            next();
        } catch (error) {
            const message = error.details.map((detail) => detail.message).join(',');
            next(new AppError(400, message, null, 'failed'));
        }
    });
};


export default validateRequest