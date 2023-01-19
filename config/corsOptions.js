const allowedOrigins = require('./allowedOrigins');
const {error_notification} = require("../utils");

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            error_notification(`Origin { ${origin} } is not allowed by CORS`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions;