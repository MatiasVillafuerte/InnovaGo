const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const authController = require('../controllers/authController');

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected routes
router.get('/user', auth, authController.getUser);
router.post('/logout', auth, authController.logout);
router.post('/verify-email', auth, authController.verifyEmail);
router.post('/resend-verification', auth, authController.resendVerificationCode);

module.exports = router;
