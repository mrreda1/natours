const express = require("express");
const userController = require("./../controllers/users");
const authController = require("./../controllers/auth");
const reviewRouter = require("./../routes/reviews");

const router = express.Router();

router.use("/:userID/reviews", reviewRouter);

router.post("/signup", authController.signup);
router.get("/login", authController.login);

router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);
router
  .route("/updateMyPassword")
  .patch(authController.protect, authController.updatePassword);
router
  .route("/updateMyInfo")
  .patch(authController.protect, userController.updateUser);
router
  .route("/deleteMyAccount")
  .delete(authController.protect, userController.deleteMyAccount);
router
  .route("/delete/:id")
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    userController.deleteUser,
  );

router
  .route("/")
  .get(userController.getAllUsers)
  // .post(userController.createUser);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
