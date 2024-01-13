const gradeReviewController = require("../controllers/gradeReviewController");

const router = require("express").Router();

router.post(
  "/student/:studentId/classroom/:classroomId/assignment/:assignmentId",
  gradeReviewController.createGradeReview
);


router.get("/classroom/:classroomId", gradeReviewController.getGradeReviewByClassRoom);

router.get("/:id", gradeReviewController.getGradeReviewById);

module.exports = router;
