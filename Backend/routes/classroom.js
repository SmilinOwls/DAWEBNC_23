const classController = require("../controllers/classController");
const authMiddleware = require("../middleware/authMiddleware");
const router = require("express").Router();

//Create Classroom by admin
router.post(
  "/admin/",
  authMiddleware.authorizeRole,
  classController.createClass
);

// Create Classroom by teacher
router.post(
  "/role-teacher",
  authMiddleware.verifyToken,
  classController.createClass
);

router.get("/", classController.getAllClasses);

router.get("/:id", classController.getClassById);

router.get(
  "/teacher/me",
  authMiddleware.verifyToken,
  classController.getClassByCreatedUser
);

// Delete room
router.delete(
  "/admin/:id",
  authMiddleware.authorizeRole,
  classController.deleteClass
);
router.delete(
  "/role-teacher/:id",
  authMiddleware.verifyToken,
  classController.deleteClass
);

router.put(
  "/admin/:id",
  authMiddleware.authorizeRole,
  classController.updateClass
);
router.put(
  "/role-teacher/:id",
  authMiddleware.verifyToken,
  classController.updateClass
);

router.post('/:id/accept/code', authMiddleware.verifyToken, classController.joinClassViaCode);
router.get('/:id/join/link', authMiddleware.verifyToken, classController.validateInvitationLink);
router.post('/:id/accept/link', authMiddleware.verifyToken, classController.joinClassViaInvitationLink);
router.post('/:id/send-email', authMiddleware.verifyToken, classController.sendEmailInvitation);
router.get('/email/redirect', authMiddleware.verifyToken, classController.validateEmailInvitationLink);
router.post('/:id/accept/email', authMiddleware.verifyToken, classController.joinClassViaEmail);

module.exports = router;
