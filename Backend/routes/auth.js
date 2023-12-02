const authControllers = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = require("express").Router();

router.post("/register", authControllers.registerUser, authControllers.sendActiveAccountMail);
router.post("/login", authControllers.loginUser);
router.post("/refresh", authControllers.requestRefreshToken);
router.post("/logout", authMiddleware.verifyToken, authControllers.logOut);
// router.post("/password/forgot", authControllers.forgotPassword);
// router.put("/password/reset/:token", authControllers.resetPassword);
router.post("/forgot-password", authControllers.forgotPassword);
router.post("/verify", authControllers.verifyResetToken);
router.put("/password/reset/", authControllers.resetPassword);
router.post("/accout-activate", authControllers.verifyActiveAccount);

module.exports = router;