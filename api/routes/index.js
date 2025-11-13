const express = require('express');
const { login, getUserData } = require('../controllers/authController');
const { registerUser } = require('../controllers/userController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', login);
router.get('/user', getUserData);

module.exports = router;
