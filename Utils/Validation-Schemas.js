import Joi from 'joi';
import sanitizeHtml from 'sanitize-html';

const sanitize = (value) => {
    if (typeof value === 'string') {
        const sanitizedValue = sanitizeHtml(value);
        console.log(`Original: ${value}, Sanitized: ${sanitizedValue}`);
        return sanitizedValue;
    }
    return value;
};
const UserSchema = Joi.object({
    firstname: Joi.string().lowercase().trim().custom((value, helpers) => sanitize(value)),
    lastname: Joi.string().lowercase().trim().custom((value, helpers) => sanitize(value)),
    email: Joi.string().required().email().trim().custom((value, helpers) => sanitize(value)),
    password: Joi.string().required().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])")).min(8).max(25).trim(),
    role: Joi.string().valid('admin', 'user').custom((value, helpers) => sanitize(value)),
    verifiedEmail: Joi.boolean()
});

const EventSchema = Joi.object({
    title: Joi.string().required().trim().custom((value, helpers) => sanitize(value)),
    description: Joi.string().required().trim().custom((value, helpers) => sanitize(value)),
    location: Joi.string().custom((value, helpers) => sanitize(value)),
    organizerId: Joi.string().required().custom((value, helpers) => sanitize(value)),
    bookings: Joi.array().items(
        Joi.object({
            userId: Joi.string().required().custom((value, helpers) => sanitize(value)),
            status: Joi.string().required().valid('pending', 'accepted', 'rejected').custom((value, helpers) => sanitize(value))
        })
    )
});

export default{
    UserSchema,
    EventSchema
};
