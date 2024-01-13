import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import gradeReviewApi from "../../Services/gradeReviewApi";
import classroomApi from "../../Services/classroomApi";
import { Divider } from "antd";

function DetailGradeReview() {
  const { classId, id } = useParams();

  const [review, setReview] = useState({});
  const [student, setStudent] = useState({});

  useEffect(() => {
    getGradeReviewById();
  }, []);

  const getGradeReviewById = async () => {
    try {
      const response = await gradeReviewApi.getGradeReviewById(id);
      const data = response.data;
      setReview(data);
      getStudentInfo(data.studentId);
    } catch (error) {
      console.log(error);
    }
  };

  const getStudentInfo = async (studentId) => {
    try {
      const response = await classroomApi.getStudentInfo(classId, studentId);
      const data = response.data;
      setStudent(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h1>Grade Review Details</h1>
      <div className="w-[80%]">
        <div className="flex justify-between items-center gap-24">
          <div className="flex items-center gap-3">
            <img
              src={student.profilePic || "https://i.imgur.com/HeIi0wU.png"}
              alt="avatar"
              className="w-8 h-8 object-contain rounded-full"
            />
            <div className="text-[24px] leading-4">{student.fullname}</div>
          </div>
          <div className="text-xl font-semibold">
            Expected Grade:{" "}
            <span className=" text-blue-500">{review.grade}</span>
          </div>
        </div>
        <Divider className=" bg-blue-400" />
        <p>
          <span className="text-lg font-bold">Grade Composition:</span>{" "}
          {review.gradeComposition || "None"}
        </p>
        <p>
          <span className="text-lg font-bold">Current grade:</span>{" "}
          {review.currentGrade}
        </p>
        <p>
          <span className="text-lg font-bold">Expected grade:</span>{" "}
          {review.grade}
        </p>
        <p>
          <span className="text-lg font-bold">Comment:</span> {review.comment}
        </p>
      </div>
    </div>
  );
}

export default DetailGradeReview;
