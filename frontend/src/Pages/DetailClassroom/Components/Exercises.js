import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import assignmentApi from "../../../Services/assignmentApi";
import { AssignmentIcon } from "./ExerciseIcon";

const Exercises = ({ classId }) => {
  const [assignments, setAsssignments] = useState([]);
  const history = useHistory();

  function handleClick() {
    localStorage.setItem("classId", classId);
    history.push(`/create-assignment`);
  }

  const handleGetAssignment = async () => {
    try {
      const response = await assignmentApi.getAssignmentByClass(classId);
      setAsssignments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetAssignment();
  }, [classId]);

  console.log("assignment", assignments);

  return (
    <>
      <div
        className="border bg-sky-400 w-[200px] cursor-pointer text-white text-center p-2 rounded-full hover:bg-sky-600"
        onClick={handleClick}
      >
        + Create Asssignment
      </div>
      {assignments.length > 0 && assignments.map(item => {
        return   (
          <div key={item.id} className="bg-white my-5 border rounded-[12px] flex items-center justify-between p-4 cursor-pointer">
            <div className="flex items-center justify-center gap-4">
              <div className="p-3 rounded-full bg-cyan-400 text-center">
                <AssignmentIcon />
              </div>
              <p className="text-[22px] font-[500] text-[#3c4043] text-center pt-2">
                {item.title}
              </p>
            </div>
            <div className="flex items-center justify-center gap-4">
                <p className="text-[15px] text-[#d5d5d5] mt-[20px]">Posted: {item?.dueDate?.slice(0, 10)}</p>
                <div className="pt-2">
                  <AiOutlineClose />
                </div>
            </div>
          </div>
        )
      })}
    
    </>
  );
};

export default Exercises;
