const BusinessError = function(msg, httpStatusCode = 400) {
    this.message = msg;
    this.httpStatusCode = httpStatusCode;
};

exports.asyncMiddleware = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

exports.BusinessError = BusinessError;

exports.handler = (err, req, res, next) => {
    console.log(err);
    if(err instanceof BusinessError){
        res.status(err.httpStatusCode).send({
            message: err.message
        });
    }
    else{
        res.status(500).send({
            message: 'Internal server error!'
        });
    }
}