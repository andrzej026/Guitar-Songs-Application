const Router = require('express')
const router = new Router()
const usersController = require('../controllers/usersController')
const authMiddleware = require('../middleware/authMiddleware')
const { body } = require('express-validator')

router.post(
    '/singup',
    body('email').isEmail().withMessage('Please Enter Correct E-Mail'),
    body('password')
        .isLength({ min: 5 })
        .withMessage('Password must be longer than 5 symbols'),
    usersController.singup
)
router.post('/login', usersController.login)
router.get('/checkAuth', authMiddleware, usersController.checkAuth)

module.exports = router
