import { ApiError } from "../utils/ApiError.js";

const errorMiddleware = (err, req, res, next) => {
    let error = err;

    // Normalize Mongoose error types into an ApiError first
    if (!(error instanceof ApiError)) {
        let statusCode = error.statusCode || 500;
        let message = error.message || "Something went wrong";

        if (error.name === "CastError") {
            statusCode = 400;
            message = `Invalid value for field "${error.path}"`;
        } 
        else if (error.name === "ValidationError") {
            statusCode = 400;
            message = Object.values(error.errors)
                .map((val) => val.message)
                .join(", ");
        } 
        else if (error.code === 11000) {
            statusCode = 409;

            const field = Object.keys(error.keyValue || {})[0] || "field";
            
            message = `That ${field} is already in use`;
        } 
        else if (error.name === "JsonWebTokenError") {
            statusCode = 401;
            message = "Invalid access token";
        } 
        else if (error.name === "TokenExpiredError") {
            statusCode = 401;
            message = "Session expired, please log in again";
        }

        error = new ApiError(statusCode, message, error?.errors || [], err.stack);
    }

    const response = {
        success: false,
        message: error.message,
        errors: error.errors,
        data: error.data,
        ...(process.env.NODE_ENV !== "production" && { stack: error.stack }),
    };

    return res.status(error.statusCode || 500).json(response);
};

export { errorMiddleware };

