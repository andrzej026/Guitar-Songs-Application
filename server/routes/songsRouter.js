const Router = require('express')
const songsController = require('../controllers/songsController')
const router = new Router()

router.post('/', songsController.create)
router.get('/', songsController.getAll)
router.get('/:id', songsController.getOne)

module.exports = router
