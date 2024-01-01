import React from "react";
import { useHistory } from "react-router-dom";

const Exercises = ({classId}) => {
  const history = useHistory();

  function handleClick() {
    localStorage.setItem("classId", classId);
    history.push(`/create-assignment`);
  }

  return (
    <div
      className="border bg-sky-400 w-[200px] cursor-pointer text-white text-center p-2 rounded-full hover:bg-sky-600"
      onClick={handleClick}
    >
      + Create Asssignment
    </div>
  );
};

export default Exercises;
