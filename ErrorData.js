


const ErrorObject = function (message,statusCode) {
    this.message = message;
    this.statusCode = statusCode;
}


const badRequestError =  (error) => {

    return new ErrorObject(message,400);
}


const unauthorizedError =  (message) => {

    return new ErrorObject(message,401);
}


const notFoundError =  (message) => {

    return new ErrorObject(message,404);
}

const notAcceptableError =  (message) => {

    return new ErrorObject(message,406);
}

module.exports = {
    ErrorObject,
    badRequestError,
    unauthorizedError,
    notFoundError,
    notAcceptableError
}
