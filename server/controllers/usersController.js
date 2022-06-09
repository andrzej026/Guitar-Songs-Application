const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Users } = require('../models/models')
const { Op } = require('sequelize')
const { validationResult } = require('express-validator')

const generateJwt = (id, email, login, role) => {
    return jwt.sign({ id, email, login, role }, process.env.SECRET_KEY, {
        expiresIn: '1h',
    })
}

const findUser = (user, password, next) => {
    if (!user) {
        return next(ApiError.notFound('User not found'))
    }
    const comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
        return next(ApiError.notFound('Uncorrect password'))
    }
}

class UsersController {
    async singup(request, response, next) {
        console.log(request.body)
        try {
            const errors = validationResult(request)
            const { email, login, password, confirmPassword } = request.body
            if (!email || !login || !password || !confirmPassword) {
                return next(ApiError.badRequest('Fill in all fields'))
            }
            if (password !== confirmPassword) {
                return next(ApiError.badRequest('Passwords don`t match'))
            }
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest(errors.array()))
            }

            const candidate = await Users.findOne({
                where: {
                    [Op.or]: [{ email }, { login }],
                },
            })
            if (candidate) {
                return next(ApiError.badRequest('This User already exists'))
            }
            const hashPassword = await bcrypt.hash(password, 5)
            const user = await Users.create({ email, login, password: hashPassword })
            const token = generateJwt(user.id, user.email, user.login, user.role)
            return response.json({
                token,
                message: 'Registration is complete! Now log in',
            })
        } catch (error) {
            console.log(error)
        }
    }

    async login(request, response, next) {
        const { email, login, password } = request.body
        try {
            if (!email) {
                const user = await Users.findOne({
                    where: { login },
                })
                if (!login || !password) {
                    return next(ApiError.badRequest('Fill in all fields'))
                }
                findUser(user, password, next)
                const token = generateJwt(user.id, user.email, user.login, user.role)
                return response.json({ token })
            }
            if (!login) {
                const user = await Users.findOne({
                    where: { email },
                })
                if (!email || !password) {
                    return next(ApiError.badRequest('Fill in all fields'))
                }
                findUser(user, password, next)
                const token = generateJwt(user.id, user.email, user.login, user.role)
                return response.json({ token })
            }
        } catch (error) {
            console.log(error)
        }
    }

    async checkAuth(request, response, next) {
        const token = generateJwt(
            request.user.id,
            request.user.email,
            request.user.login,
            request.user.role
        )
        // console.log(response)
        return response.json({ token })
    }
}

module.exports = new UsersController()
