import React, { useState, useMemo } from "react";
import { Table, InputNumber, message, Typography, Dropdown } from "antd";
import classrommApi from "../../../Services/classroomApi";
import { CheckOutlined, EllipsisOutlined } from "@ant-design/icons";

const menuProps = () => {
  const items = [
    {
      label: "Mark as final",
      key: "0",
      icon: <CheckOutlined />,
      onClick: () => {},
    },
  ];

  return {
    items,
  };
};

const GradeBoard = ({ classroom, assignments }) => {
  const [grade, setGrade] = useState(0);
  const [editingRecord, setEditingRecord] = useState({});
  const [editingAssignment, setEditingAssignment] = useState({});
  const [loadingGrade, setLoadingGrade] = useState(false);

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
      width: "15%",
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
    {
      title: "Total Grade",
      key: "totalGrade",
      render: (_, record) => {
        const totalGrade = record.grades.reduce(
          (sum, studentGrade) => sum + (studentGrade?.grade || 0),
          0
        );
        return totalGrade;
      },
    },
    ...assignments.map((assignment, index) => ({
      title: assignment.title,
      dataIndex: assignment._id,
      key: assignment._id,
      render: (text, record) => {
        const tempGrade = record.grades[index]?.tempGrade;
        const grade = record.grades[index]?.grade;

        return record.fullname !== "Total Grade" ? (
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
            <Dropdown.Button
              menu={menuProps()}
              trigger={["click"]}
              buttonsRender={([]) => [
                <div />,
                <div className="rotate-90 absolute top-2 right-2 cursor-pointer p-2 rounded-3xl hover:bg-zinc-400/30">
                  <EllipsisOutlined className="text-[24px] text-slate-600" />
                </div>,
              ]}
            />
          </div>
        ) : (
          <Typography.Text>{grade}</Typography.Text>
        );
      },
    })),
  ];

  //   const totalGrade = useMemo(() => {
  //     const totalGrade = classroom?.students?.reduce((sum, student) => {
  //       const studentTotalGrade = student.grades.reduce(
  //         (sum, studentGrade) => sum + (studentGrade?.grade || 0),
  //         0
  //       );
  //       return sum + studentTotalGrade;
  //     }, 0);
  //     return totalGrade;
  //   }, [classroom]);

  const totalGradesByAssignment = useMemo(() => {
    const totalGrades = {};
    classroom?.students?.forEach((student) => {
      student.grades.forEach((grade) => {
        if (!totalGrades[grade.assignmentId]) {
          totalGrades[grade.assignmentId] = 0;
        }
        totalGrades[grade.assignmentId] += grade.grade || 0;
      });
    });

    return totalGrades;
  }, [classroom]);

  const studentsWithTotal = useMemo(() => {
    const total = {
      studentId: "",
      fullname: "Total Grade",
      profilePic: null,
      grades: Object.entries(totalGradesByAssignment).map(
        ([assignmentId, totalGrade]) => ({
          assignmentId,
          grade: totalGrade,
        })
      ),
    };

    const students = classroom?.students || [];
    return [total, ...students];
  }, [classroom]);

  return (
    <Table
      bordered
      rowKey={(record) => record.studentId}
      dataSource={studentsWithTotal}
      columns={columns}
    />
  );
};

export default GradeBoard;
