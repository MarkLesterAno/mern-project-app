import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    // Default error response structure
    const errorResponse = {
        error: {
            message: 'Internal server error',
        },
    };

    // Log error stack trace for debugging purposes (exclude in production)
    if (process.env.NODE_ENV !== 'production') {
        console.error(err.stack);
    }

    // Handle UnauthorizedError (JWT-related errors)
    if (err.name === 'UnauthorizedError') {
        res.status(401);

        // Handle different error codes within the UnauthorizedError
        switch (err.code) {
            case 'credentials_required':
                errorResponse.error.message = err.inner ? err.inner.message : 'Credentials are required';
                break;
            case 'invalid_token':
                errorResponse.error.message = err.inner ? err.inner.message : 'Invalid token';
                break;
            default:
                errorResponse.error.message = err.inner ? err.inner.message : 'Unauthorized access';
                break;
        }

        // Handle ValidationError (Mongoose-related validation errors)
    } else if (err.name === 'ValidationError') {
        res.status(400);
        errorResponse.error.message = err.message || 'Validation failed';

        // Handle custom errors with known status codes
    } else if (err.statusCode) {
        res.status(err.statusCode);
        errorResponse.error.message = err.message || 'Something went wrong';

        // For all other errors (Internal server error, etc.)
    } else {
        res.status(500); // Default to internal server error
        errorResponse.error.message = err.message || 'Internal server error';
    }

    // Send the response
    res.json(errorResponse);
};

export default errorHandler;
