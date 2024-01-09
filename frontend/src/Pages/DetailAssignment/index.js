import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import assignmentApi from "../../Services/assignmentApi";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1585637071663-799845ad5212?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNsYXNzcm9vbXxlbnwwfHwwfHx8MA%3D%3D";

const DetaiAssignment = () => {
  const [detailAssignment, setDetailAssignment] = useState(null);
  const { assignmentId } = useParams();
  const handleGetDetailAssignment = async () => {
    try {
      const res = await assignmentApi.getDetailAssignment(assignmentId);
      if (res) {
        setDetailAssignment(res?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetDetailAssignment();
  }, [assignmentId]);

  console.log("assginment", detailAssignment);

  return (
    <div className="flex flex-col px-[60px] mb-10">
      <div className="w-full relative">
        <img
          src={detailAssignment?.image || DEFAULT_IMAGE}
          className="w-full h-[650px]"
        />
      </div>
      {detailAssignment ? (
        <div className="mt-6">
          <div>
            <p className="text-center text-[24px] text-[#121212] font-[580]">
              {detailAssignment?.title}
            </p>
          </div>
          <div className="flex justify-start flex-col">
            <p className="text-[20px] font-[580] text-[#121212]">
              Description:{" "}
              <span className="font-[450]">
                {detailAssignment?.description}
              </span>
            </p>
            <p className="text-[20px] font-[580] text-[#121212]">
              Created Date:{" "}
              <span className="font-[450]">
                {detailAssignment?.createdAt?.slice(0, 10)}
              </span>
            </p>
            <p className="text-[20px] font-[580] text-[#121212]">
              Due Date:{" "}
              <span className="font-[450]">
                {detailAssignment?.dueDate?.slice(0, 10)}
              </span>
            </p>
            <div>
              <p className="text-[20px] font-[580] text-[#121212]">
                Documents:
              </p>
              <div className="bg-[#efefef] rounded-[8px] p-4">
                {detailAssignment?.document?.map((item) => (
                  <div className="mb-3">
                    <a href={item} target="_blank">
                      {item}
                    </a>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[20px] font-[580] text-[#121212]">
                Grade Composition:{" "}
                <span className="font-[450]">{detailAssignment?.gradeComposition}</span>
              </p>
            </div>
            <div>
              <p className="text-[20px] font-[580] text-[#121212]">
                Point type:{" "}
                <span className="font-[450]">{detailAssignment?.maxPoint}</span>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-6">
          <p className="text-center text-[25px] text-[#121212] font-[580]">
            No Assignment created
          </p>
        </div>
      )}
    </div>
  );
};

export default DetaiAssignment;
