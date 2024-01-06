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

router.get(
  "/participate/me",
  authMiddleware.verifyToken,
  classController.getAllParticipatedClass
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

router.get('/:id/account-joined', authMiddleware.verifyToken, classController.checkClassJoined);
router.post('/accept/code', authMiddleware.verifyToken, classController.joinClassViaCode);
router.get('/:id/join/link', authMiddleware.verifyToken, classController.validateInvitationLink);
router.post('/accept/link', authMiddleware.verifyToken, classController.joinClassViaInvitationLink);
router.post('/:id/invite/email', authMiddleware.verifyToken, classController.sendEmailInvitation);
router.get('/email/redirect', classController.validateEmailInvitationLink);
router.post('/accept/email', authMiddleware.verifyToken, classController.joinClassViaEmail);

module.exports = router;
