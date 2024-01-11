import React, { useState, useEffect } from "react";
import { Table, InputNumber, message } from "antd";
import assignmentApi from "../../../Services/assignmentApi";
import classrommApi from "../../../Services/classroomApi";

const GradeBoard = ({ classroom, setClassroom }) => {
  const [assignments, setAssignments] = useState([]);
  const [grade, setGrade] = useState(0);
  const [editingRecord, setEditingRecord] = useState({});
  const [editingAssignment, setEditingAssignment] = useState({});
  const [loadingGrade, setLoadingGrade] = useState(false);

  useEffect(() => {
    getAssignmentByClass();
  }, [classroom]);

  const getAssignmentByClass = async () => {
    const classroomId = classroom._id;
    if (!classroomId) return;

    try {
      const response = await assignmentApi.getAssignmentByClass(classroomId);
      const data = response.data;
      setAssignments(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGradeChange = async (studentId, assignmentId) => {
    setLoadingGrade(true);
    try {
      await classrommApi.updateGrade(
        classroom._id,
        studentId,
        assignmentId,
        grade
      );
    } catch (error) {
      message.error(error.response.data.message);
    } finally {
      setLoadingGrade(false);
    }
  };

  const columns = [
    {
      title: "Student ID",
      dataIndex: "studentId",
      key: "studentId",
      width: "10%",
    },
    {
      title: "Full Name",
      dataIndex: "fullname",
      width: "20%",
      key: "fullname",
      render: (text, record) => (
        <div className="flex items-center gap-2">
          <img
            src={
              record.profilePic
                ? record.profilePic
                : "https://i.imgur.com/HeIi0wU.png"
            }
            alt="avatar"
            style={{ width: "30px", height: "30px", borderRadius: "50%" }}
          />
          <span
            className="hover:cursor-pointer hover:underline hover:text-blue-400"
            onClick={() =>
              (window.location.href = `/classroom/${classroom._id}/students/${record.studentId}`)
            }
          >
            {record.fullname}
          </span>
        </div>
      ),
    },
    ...assignments.map((assignment, index) => ({
      title: assignment.title,
      dataIndex: assignment._id,
      key: assignment._id,
      render: (text, record) => {
        const tempGrade = record.grades[index]?.tempGrade;
        const grade = record.grades[index]?.grade;

        return (
          <div className="flex flex-col gap-1">
            <InputNumber
              min={0}
              max={100}
              defaultValue={tempGrade || grade}
              onChange={(newGrade) => {
                setGrade(newGrade);
                setEditingRecord(record);
                setEditingAssignment(assignment);
              }}
              onBlur={() => handleGradeChange(record.studentId, assignment._id)}
            />
            <span className="text-xs text-gray-400">
              {record._id == editingRecord._id &&
              assignment._id == editingAssignment._id &&
              loadingGrade
                ? "Loading..."
                : !record.grades[index]?.isFinal && !tempGrade
                ? ""
                : "Draft"}
            </span>
          </div>
        );
      },
    })),
  ];

  return <Table bordered dataSource={classroom.students} columns={columns} />;
};

export default GradeBoard;
