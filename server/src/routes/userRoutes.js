const { register, getUsers } = require('../controllers/userController')

const router = require('express').Router()

router.post('/register', register)
router.get('/users', getUsers)

module.exports = router
