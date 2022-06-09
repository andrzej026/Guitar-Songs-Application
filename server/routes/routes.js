const Router = require('express')
const router = new Router()
const usersRouter = require('./usersRouter')
const songsRouter = require('./songsRouter')

router.use('/users', usersRouter)
router.use('/songs', songsRouter)

module.exports = router
