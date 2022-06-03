const express = require("express");
const { registerUser, loginUser, logout, forgotPassword,resetPassword,getUserDetails,updatePassword, updateProfile, getAllUser, getSingleUser, updateUserRole, deleteUser } = require("../controllers/userController");
const router =express.Router();
const { isAuthenticatedUser, authorizeRoules } = require("../middleware/auth");

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/password/forgot").post(forgotPassword)
router.route("/password/reset/:id").put(resetPassword);
router.route("/logout").get(logout)
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);
router.route("/admin/users").get(isAuthenticatedUser,authorizeRoules("admin"),getAllUser)
router.route("/admin/user/:id").get(isAuthenticatedUser,authorizeRoules("admin"),getSingleUser)
.put(isAuthenticatedUser,authorizeRoules("admin"),updateUserRole)
.delete(isAuthenticatedUser,authorizeRoules("admin"),deleteUser)




module.exports = router;