const { register, login, selectAvatar } = require('../controllers/userController')

const router = require('express').Router()

router.post('/register', register)
router.post('/login', login)
router.post('/setAvatar/:id', selectAvatar)

module.exports = router
