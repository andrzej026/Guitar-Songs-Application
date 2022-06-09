const ApiError = require('../error/ApiError')

module.exports = function (error, request, respose, next) {
    if (error instanceof ApiError) {
        return respose.status(error.status).json({ message: error.message })
    }
    return respose.status(500).json({ message: 'Unknown Error' })
}
