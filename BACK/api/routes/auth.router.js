const router = require('express').Router()
const {
    signup,
    login
} = require('../controllers/auth.controller')

router.post('/singup', signup)
router.post('/login', login)

module.exports = router