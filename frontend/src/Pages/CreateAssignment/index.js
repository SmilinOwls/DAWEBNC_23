import React, { useState } from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const CreateAssignment = () => {
  const [file, setFile] = useState(null);
  const [value, setValue] = React.useState(null);

  const classId = localStorage.getItem("classId") || "";

  console.log("class id", classId);

  return (
    <div className="mt-5 mx-[60px] mb-4 border p-6 rounded-lg">
      <p className="text-[25px] font-bold text-center mb-6">
        Create Assignment
      </p>
      <form>
        <div className="mb-4">
          <label className="text-[15px] text-[#d5d5d5] mb-3">Title</label>
          <input
            type="text"
            className="w-full rounded-[12px] px-3 py-2 border focus:outline focus:outline-[#6DB9EF] placeholder:text-[20px] placeholder:text-[#ddd]"
            placeholder="Enter title of subject"
            required
          />
        </div>
        <div>
          <label className="text-[15px] text-[#d5d5d5] mb-3">Due Date</label>
        </div>
        <div className="mb-4 block">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{width: "100%"}}
              label="Enter date"
              value={value}
              onChange={(newValue) => setValue(newValue)}
            />
          </LocalizationProvider>
        </div>
        <div className="mb-4">
          <label className="text-[15px] text-[#d5d5d5] mb-3">Description</label>
          <textarea
            type="text"
            className="w-full rounded-[12px] px-3 py-2 border focus:outline focus:outline-[#6DB9EF] placeholder:text-[20px] placeholder:text-[#ddd]"
            placeholder="Enter description"
            required
          />
        </div>
        <button className="mt-6 flex items-center justify-center border hover:bg-white hover:border hover:border-[#E48F45] hover:!text-[#E48F45] transition text-center px-3 py-2 rounded-xl bg-[#E48F45] text-white font-semibold">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateAssignment;
