import React, { useState } from "react";
import { Button, Input, message } from "antd";
import classroomApi from "../../Services/classroomApi";
import { useHistory } from "react-router-dom";

const JoinClassroom = () => {
  const [classCode, setClassCode] = useState("");
  const [loading, setLoading] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const history = useHistory();

  const handleJoin = () => {
    setLoading(true);
    classroomApi
      .joinClassByCode(classCode)
      .then((res) => {
        message.success("Successfully joined the classroom");
        setLoading(false);
        history.push(`/classroom/${res.data._id}`);
      })
      .catch((err) => {
        message.error("Failed to join the classroom");
        setLoading(false);
      });
  };

  const codeValidation = classCode.length < 5 || classCode.length > 7;

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-[40%] flex flex-col justify-start py-2 px-4 border rounded-md border-slate-400">
        <p className="text-gray-400">You are signing in by the account</p>
        <div className="flex items-center justify-center gap-2">
          <img
            src={
              userInfo?.profilePic
                ? userInfo?.profilePic
                : "https://i.pravatar.cc/150?img=56"
            }
            alt="avatar"
            className="rounded-full w-[40px]"
          />
          <div className="font-normal flex flex-1 flex-col justify-center">
            <div className="font-bold">{userInfo?.username}</div>
            <p>{userInfo?.email}</p>
          </div>
        </div>
      </div>
      <div className="w-[40%] m-8 border border-slate-400 rounded-md px-8 py-4">
        <h3>Join a classroom</h3>
        <Input
          className="mt-2"
          placeholder="Enter classroom code"
          value={classCode}
          onChange={(e) => setClassCode(e.target.value)}
        />
        <Button
          className="mt-2"
          type="primary"
          loading={loading}
          onClick={handleJoin}
          disabled={codeValidation}
        >
          Join Classroom
        </Button>
      </div>
      <div className="w-[40%]">
        How to log in with class code
        <ul className="list-disc">
          <li>Use a licensed</li>
          <li>
            Use a class code of 5-7 letters or numbers, with no spaces or
            symbols
          </li>
        </ul>
      </div>
    </div>
  );
};

export default JoinClassroom;
