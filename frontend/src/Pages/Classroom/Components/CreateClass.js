import React, { useState } from "react";
import classroomApi from "../../../Services/classroomApi";
import Swal from "sweetalert2";

const CreateClass = () => {
  const [classroomInfo, setClassroomInfo] = useState({
    name: "",
    description: "",
    categoryCode: "",
  });
  const [teacherInfo, setTeacherInfo] = useState({
    fullname: "",
    email: "",
  });
  const [studentInfo, setStudentInfo] = useState({
    fullname: "",
    email: "",
  });
  const [listOfTeachers, setListOfTeacher] = useState([]);
  const [listOfStudent, setListOfStudent] = useState([]);

  const handleAddTeacher = () => {
    if (teacherInfo.fullname && teacherInfo.email) {
      setListOfTeacher((prev) => [
        ...prev,
        {
          fullname: teacherInfo.fullname,
          email: teacherInfo.email,
        },
      ]);
    }
    setTeacherInfo((prev) => ({
      ...prev,
      fullname: "",
      email: "",
    }));
  };

  const handleAddStudent = () => {
    if (studentInfo.fullname && studentInfo.email) {
      setListOfStudent((prev) => [
        ...prev,
        {
          fullname: studentInfo.fullname,
          email: studentInfo.email,
        },
      ]);
    }
    setStudentInfo((prev) => ({
      ...prev,
      fullname: "",
      email: "",
    }));
  };

  const handleCreateClass = async (e) => {
    e.preventDefault();
    const data = {
      name: classroomInfo.name,
      description: classroomInfo.description,
      categoryCode: classroomInfo.categoryCode,
      teachers: listOfTeachers,
      students: listOfStudent,
    };
    try {
      const response = await classroomApi.createClassroom(data);
      console.log(response);
      if (response) {
        Swal.fire(
          "Create class successfully!",
          "Return back to classroom page!",
          "success"
        ).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/classroom";
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-5 mx-[60px] mb-4 border p-6 rounded-lg">
      <p className="text-[25px] font-bold text-center mb-6">Create Classroom</p>
      <form>
        <div className="mb-4">
          <label className="text-[15px] text-[#d5d5d5] mb-3">Subject</label>
          <input
            type="text"
            className="w-full rounded-[12px] px-3 py-2 border focus:outline focus:outline-[#6DB9EF] placeholder:text-[20px] placeholder:text-[#ddd]"
            placeholder="Enter subject of classroom"
            required
            value={classroomInfo.name}
            onChange={(e) =>
              setClassroomInfo((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />
        </div>
        <div className="mb-4">
          <label className="text-[15px] text-[#d5d5d5] mb-3">Description</label>
          <input
            type="text"
            className="w-full rounded-[12px] px-3 py-2 border focus:outline focus:outline-[#6DB9EF] placeholder:text-[20px] placeholder:text-[#ddd]"
            placeholder="Enter description"
            required
            value={classroomInfo.description}
            onChange={(e) =>
              setClassroomInfo((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
        </div>
        <div>
          <label className="text-[15px] text-[#d5d5d5] mb-3">
            Category code
          </label>
          <input
            type="text"
            className="w-full rounded-[12px] px-3 py-2 border focus:outline focus:outline-[#6DB9EF] placeholder:text-[20px] placeholder:text-[#ddd]"
            placeholder="Enter category"
            required
            value={classroomInfo.categoryCode}
            onChange={(e) =>
              setClassroomInfo((prev) => ({
                ...prev,
                categoryCode: e.target.value,
              }))
            }
          />
        </div>
        <div className="my-3">
          <p className="text-[20px] font-semibold mb-3">List of Teachers:</p>
          <div className="flex flex-wrap gap-4 mb-3">
            <div>
              <label className="text-[15px] text-[#d5d5d5] mb-3">
                Fullname
              </label>
              <input
                type="text"
                className="w-full rounded-[12px] px-3 py-2 border focus:outline focus:outline-[#6DB9EF] placeholder:text-[20px] placeholder:text-[#ddd]"
                placeholder="Enter Fullname"
                value={teacherInfo.fullname}
                onChange={(e) =>
                  setTeacherInfo((prev) => ({
                    ...prev,
                    fullname: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <label className="text-[15px] text-[#d5d5d5] mb-3">Email</label>
              <input
                type="email"
                className="w-full rounded-[12px] px-3 py-2 border focus:outline focus:outline-[#6DB9EF] placeholder:text-[20px] placeholder:text-[#ddd]"
                placeholder="Enter Email"
                value={teacherInfo.email}
                onChange={(e) =>
                  setTeacherInfo((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-3 pt-2 rounded-lg mt-3 bg-black"
          >
            <p
              className="text-white font-semibold text-[12px] text-center h-[12px]"
              onClick={handleAddTeacher}
            >
              Add
            </p>
          </button>
          <div className="mt-3">
            {listOfTeachers.length > 0 &&
              listOfTeachers.map((item, index) => (
                <div className="mb-2 flex gap-2" key={index}>
                  <p>{index + 1}.</p>
                  <p>Name: {item.fullname}</p>
                  <p>Email: {item.email}</p>
                </div>
              ))}
          </div>
        </div>
        <div className="my-3">
          <p className="text-[20px] font-semibold mb-3">List of Students:</p>
          <div className="flex flex-wrap gap-4 mb-3">
            <div>
              <label className="text-[15px] text-[#d5d5d5] mb-3">
                Fullname
              </label>
              <input
                type="text"
                className="w-full rounded-[12px] px-3 py-2 border focus:outline focus:outline-[#6DB9EF] placeholder:text-[20px] placeholder:text-[#ddd]"
                placeholder="Enter Fullname"
                value={studentInfo.fullname}
                onChange={(e) =>
                  setStudentInfo((prev) => ({
                    ...prev,
                    fullname: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <label className="text-[15px] text-[#d5d5d5] mb-3">Email</label>
              <input
                type="email"
                className="w-full rounded-[12px] px-3 py-2 border focus:outline focus:outline-[#6DB9EF] placeholder:text-[20px] placeholder:text-[#ddd]"
                placeholder="Enter Email"
                value={studentInfo.email}
                onChange={(e) =>
                  setStudentInfo((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-3 pt-2 rounded-lg mt-3 bg-black"
            onClick={handleAddStudent}
          >
            <p className="text-white font-semibold text-[12px] text-center h-[12px]">
              Add
            </p>
          </button>
          <div className="mt-3">
            {listOfStudent.length > 0 &&
              listOfStudent.map((item, index) => (
                <div className="mb-2 flex gap-2" key={index}>
                  <p>{index + 1}.</p>
                  <p>Name: {item.fullname}</p>
                  <p>Email: {item.email}</p>
                </div>
              ))}
          </div>
        </div>
        <button
          className="mt-6 flex items-center justify-center hover:bg-white hover:border hover:border-[#E48F45] hover:!text-[#E48F45] transition text-center px-3 py-2 rounded-xl bg-[#E48F45] text-white font-semibold"
          onClick={handleCreateClass}
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateClass;
