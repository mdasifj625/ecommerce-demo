const express = require('express');
const userController = require('../controller/userController');
const authController = require('../controller/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.get('/verifyEmail/:token', authController.verifyEmail);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.spamUserCreate);

router
  .route('/:id')
  .get(userController.getUser);

module.exports = router;
