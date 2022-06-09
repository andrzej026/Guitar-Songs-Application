const jwt = require('jsonwebtoken')
const ApiError = require('../error/ApiError')

module.exports = function (request, response, next) {
    if (request.method === 'OPTIONS') {
        next()
    }
    try {
        const token = request.headers.authorisation.split(' ')[1]
        if (!token) {
            return next(ApiError.unauthorized('Unauthorized'))
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        request.user = decoded
        next()
    } catch (error) {
        return next(ApiError.unauthorized('Unauthorized'))
    }
}
