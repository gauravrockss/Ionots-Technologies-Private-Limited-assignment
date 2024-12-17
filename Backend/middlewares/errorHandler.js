import APIException from '../classes/APIException.js';

export default function (err, req, res, next) {
    console.log('Handling Error...');

    if (err.name === 'TokenExpiredError') {
        return res.status(401).error(err.message);
    }

    if (err instanceof APIException) {
        return res.status(err.statusCode).error({
            errors: err.message,
        });
    }

    // Handle ValidationError directly
    if (err.name === 'ValidationError') {
        const paths = Object.keys(err.errors);
        const errors = paths.map(path => {
            const { kind, message, name } = err.errors[path];

            switch (name) {
                case 'ValidatorError':
                    return message.replace('Path', 'Field');

                case 'CastError':
                    return `Field \`${path}\` should be of type \`${kind}\``;
            }
        });
        console.log(errors, err);
        return res.status(400).error({ errors });
    }

    if (err.type === 'StripeInvalidRequestError') {
        console.log('StripeInvalidRequestError');
        return res.status(err.statusCode).error({
            message: err.message,
        });
    }

    // If no error is matched, return a 500 error
    return error500(err, req, res);
}

function error500(err, req, res) {
    console.log(err);
    return res.status(500).error('Something went wrong');
}
