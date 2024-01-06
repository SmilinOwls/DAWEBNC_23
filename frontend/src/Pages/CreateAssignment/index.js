import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "../../Services/axios";
import assignmentApi from "../../Services/assignmentApi";
import Swal from "sweetalert2";

const CreateAssignment = () => {
  const [files, setFiles] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [date, setDate] = React.useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const classId = localStorage.getItem("classId") || "";

  const handleUpload = async () => {
    setIsLoading(true);
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("assignments", files[i]);
    }
    try {
      await axios
        .post("/upload-assignment", data, {
          headers: { "Content-type": "multipart/form-data" },
        })
        .then((response) => {
          const { data: filenames } = response;
          setFiles(filenames.map((item) => `http://localhost:5000/${item}`));
          Swal.fire({
            title: "Upload Image successfully!",
            text: "Great!",
            icon: "success",
          });
        });
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleUploadDocument = async () => {
    const data = new FormData();
    for (let i = 0; i < documents.length; i++) {
      data.append("documents", documents[i]);
    }
    try {
      await axios
        .post("/upload-document", data, {
          headers: { "Content-type": "multipart/form-data" },
        })
        .then((response) => {
          const { data: filenames } = response;
          setDocuments(
            filenames.map((item) => `http://localhost:5000/${item}`)
          );
          Swal.fire({
            title: "Upload Documents successfully!",
            text: "Great!",
            icon: "success",
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateAssignment = async (e) => {
    e.preventDefault();
    const data = {
      title: title,
      description: description,
      dueDate: date,
      image: files[0] || "",
      document: documents || [],
      classroom: classId || "",
    };
    try {
      const response = await assignmentApi.createAssignment(data);
      if (response) {
        Swal.fire(
          "Create Assignment successfully!",
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="text-[15px] text-[#d5d5d5] mb-3">Due Date</label>
        </div>
        <div className="mb-4 block">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{ width: "100%" }}
              label="Enter date"
              value={date}
              onChange={(newValue) => setDate(newValue)}
            />
          </LocalizationProvider>
        </div>
        <div>
          <label className="text-[15px] text-[#d5d5d5] mb-3">Image</label>
        </div>
        <div className="mb-4">
          <input
            id="fileInput"
            type="file"
            className=""
            multiple
            onChange={(e) => setFiles(e.target.files)}
          />
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-3 pt-2 rounded-lg mt-3 bg-black"
            onClick={handleUpload}
          >
            <p className="text-white font-semibold text-[12px] text-center h-[12px]">
              {isLoading ? "Uploading..." : "Upload"}
            </p>
          </button>
        </div>
        <div>
          <label className="text-[15px] text-[#d5d5d5] mb-3">Documents</label>
        </div>
        <div className="mb-4">
          <input
            id="fileInput"
            type="file"
            className=""
            multiple
            onChange={(e) => setDocuments(e.target.files)}
          />
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-3 pt-2 rounded-lg mt-3 bg-black"
            onClick={handleUploadDocument}
          >
            <p className="text-white font-semibold text-[12px] text-center h-[12px]">
              Upload Document
            </p>
          </button>
        </div>
        <div className="mb-4">
          <label className="text-[15px] text-[#d5d5d5] mb-3">Description</label>
          <textarea
            type="text"
            className="w-full rounded-[12px] px-3 py-2 border focus:outline focus:outline-[#6DB9EF] placeholder:text-[20px] placeholder:text-[#ddd]"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button
          className="mt-6 flex items-center justify-center border hover:bg-white hover:border hover:border-[#E48F45] hover:!text-[#E48F45] transition text-center px-3 py-2 rounded-xl bg-[#E48F45] text-white font-semibold"
          onClick={handleCreateAssignment}
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateAssignment;