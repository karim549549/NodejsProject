import NodeCache from 'node-cache';

import  cache  from '../Utils/cache.js';

const cacheMiddleware = () => {
    return async (req, res, next) => {
        // Construct a cache key based on the request URL and query parameters
        const cacheKey = `${req.method}:${req.originalUrl}`;

        // Check if data is in the cache
        const cachedData = cache.get(cacheKey);

        if (cachedData) {
            // If cached data exists, send it as response
            return res.json(cachedData);
        }

        // Store response data in a temporary variable
        res.sendResponse = res.json;
        res.json = (data) => {
            // Cache the response data
            cache.set(cacheKey, data);
            // Send the response
            res.sendResponse(data);
        };

        // Continue to the next middleware/route handler
        next();
    };
};


export default cacheMiddleware;

