import React, { useEffect } from "react";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import { Table, Tag } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../Actions/UserAdminAction";
import { getClassroom } from "../../Actions/ClassAdminAction";
import { Link } from "react-router-dom";

function Dashboard() {
  const dispatch = useDispatch();

  const userColumns = [
    {
      title: "SNo",
      dataIndex: "_id",
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email - b.email,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Phone",
      dataIndex: "phone",
      sorter: (a, b) => a.phone - b.phone,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Role",
      dataIndex: "isAdmin",
      filters: [
        {
          text: "Admin",
          value: true,
        },
        {
          text: "User",
          value: false,
        },
      ],
      onFilter: (value, record) => record.isAdmin === value,
      filterMode: "tree",
      filterSearch: true,
      render: (isAdmin, _) => (
        <Tag color={isAdmin === true ? "red" : "blue"}>
          {isAdmin === true ? "Admin" : "User"}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "isOnline",
      filters: [
        {
          text: "Online",
          value: true,
        },
        {
          text: "Offline",
          value: false,
        },
      ],
      onFilter: (value, record) => record.isOnline === value,
      filterMode: "tree",
      filterSearch: true,
      render: (isOnline, _) => (
        <Tag color={isOnline === true ? "green" : "grey"}>
          {isOnline === true ? "Online" : "Offline"}
        </Tag>
      ),
    },
  ];

  const classroomColumns = [
    {
      title: "SNo",
      dataIndex: "_id",
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name - b.name,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Description",
      dataIndex: "description",
      sorter: (a, b) => a.description - b.description,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Category",
      dataIndex: "categoryCode",
      sorter: (a, b) => a.categoryCode - b.categoryCode,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Invite Code",
      dataIndex: "invitationCode" || "",
      sorter: (a, b) => a?.invitationCode - b?.invitationCode,
      sortDirections: ["descend", "ascend"],
    },
  ];

  useEffect(() => {
    dispatch(getUser());
    dispatch(getClassroom());
  }, []);

  const users = useSelector((state) => state.userAdmin);
  const classrooms = useSelector((state) => state.classroomAdmin);

  return (
    <div>
      <h3 className="mb-4">Dashboard</h3>
      <div className="d-flex justify-content-between align-content-center gap-3 mb-3">
        <div className="d-flex flex-grow-1 justify-content-between align-o bg-white rounded-3 p-3">
          <div>
            <p>Users</p> <h4 className="sub-title">{users.length}</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 style={{ color: "green" }}>
              {" "}
              <BsArrowUpRight /> 10%
            </h6>
            <div className="desc">
              <Link to="/admin/user">View more</Link>
            </div>
          </div>
        </div>
        <div className="d-flex flex-grow-1 justify-content-between align-o bg-white rounded-3 p-3">
          <div>
            <p>Classroom</p>{" "}
            <h4 className="sub-title">{classrooms?.length || 0}</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 style={{ color: "green" }}>
              {" "}
              <BsArrowUpRight /> 20%
            </h6>
            <div className="desc">
              <Link to="/admin/classroom">View more</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <h3 className="my-2 title">Users List</h3>
        <Table
          columns={userColumns}
          dataSource={users}
          rowKey={(record) => record._id}
        />
      </div>
      <div className="mt-3">
        <h3 className="my-2 title">Classrooms List</h3>
        <Table
          columns={classroomColumns}
          dataSource={classrooms}
          rowKey={(record) => record._id}
        />
      </div>
    </div>
  );
}

export default Dashboard;
