const express = require('express');
const userController = require('./../controllers/users');
const authController = require('./../controllers/auth');
const reviewRouter = require('./../routes/reviews');

const router = express.Router();

router.use('/:userID/reviews', reviewRouter);

router.post('/signup', authController.signup);
router.get('/login', authController.login);

router.post('/forgot-password', authController.forgotPassword);
router.patch('/reset-password/:token', authController.resetPassword);

router
  .route('/update-my-password')
  .patch(authController.protect, authController.updatePassword);

router
  .route('/update-my-info')
  .patch(authController.protect, userController.updateMyInfo);

router
  .route('/delete-my-account')
  .delete(authController.protect, userController.deleteMyAccount);

router.route('/').get(userController.getAllUsers);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    userController.updateUser,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    userController.deleteUser,
  );

module.exports = router;
