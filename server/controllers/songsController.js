const { Songs } = require('../models/models')
const ApiError = require('../error/ApiError')

class SongsController {
    async create(request, response, next) {
        try {
            const { artist, title, text, userId } = request.body
            if (!userId) {
                return next(ApiError.badRequest('You`re Unauthorized'))
            }
            if (!artist.trim() || !title.trim() || !text.trim()) {
                return next(ApiError.badRequest('Fill in all fields'))
            }
            console.log(request.body)
            const song = await Songs.create({ artist, title, text, userId })
            return response.json(song)
        } catch (error) {
            next(ApiError.notFound(error.message))
        }
    }

    async getAll(request, response) {
        try {
            let { userId, page, limit } = request.query
            page = +page || 1
            limit = +limit || 9
            let offset = page * limit - limit
            let songs
            if (userId) {
                songs = await Songs.findAndCountAll({ where: { userId }, limit, offset })
            } else {
                songs = await Songs.findAndCountAll({ limit, offset })
            }
            console.log(limit)
            return response.json(songs)
        } catch (error) {
            console.log(error)
        }
    }

    async getOne(request, response) {
        const { id } = request.params
        const song = await Songs.findOne({ where: { id } })
        return response.json(song)
    }
}

module.exports = new SongsController()
