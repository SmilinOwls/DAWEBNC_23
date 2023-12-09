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
  authMiddleware.authorizeTeacher,
  classController.createClass
);

router.get("/", classController.getAllClasses);

router.get("/:id", classController.getClassById);

// Delete room
router.delete(
  "/admin/:id",
  authMiddleware.authorizeRole,
  classController.deleteClass
);
router.delete(
  "/role-teacher/:id",
  authMiddleware.authorizeTeacher,
  classController.deleteClass
);

router.put(
  "/admin/:id",
  authMiddleware.authorizeRole,
  classController.updateClass
);
router.put(
  "/role-teacher/:id",
  authMiddleware.authorizeTeacher,
  classController.updateClass
);

module.exports = router;
