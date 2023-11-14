import React, { useEffect } from "react";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import { Table, Tag } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../Actions/UserAdminAction";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { Column } from "@ant-design/plots";

function Dashboard() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userAdmin);
  console.log(users);

  const columns = [
    {
      title: "SNo",
      dataIndex: "_id",
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email - b.email,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: "Phone",
      dataIndex: "phone",
      sorter: (a, b) => a.phone - b.phone,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: "Role",
      dataIndex: "isAdmin",
      filters: [
        {
          text: 'Admin',
          value: true,
        },
        {
          text: 'User',
          value: false,
        }
      ],
      onFilter: (value, record) => record.isAdmin === value,
      filterMode: 'tree',
      filterSearch: true,
      render: (isAdmin, _) => (
        <Tag color={isAdmin === true ? "red" : "blue"}>
          {isAdmin === true ? "Admin" : "User"}
        </Tag>
      )
    },
    {
      title: "Status",
      dataIndex: "isOnline",
      filters: [
        {
          text: 'Online',
          value: true,
        },
        {
          text: 'Offline',
          value: false,
        }
      ],
      onFilter: (value, record) => record.isOnline === value,
      filterMode: 'tree',
      filterSearch: true,
      render: (isOnline, _) => (
        <Tag color={isOnline === true ? "green" : "grey"}>
          {isOnline === true ? "Online" : "Offline"}
        </Tag>
      )
    },
  ];

  useEffect(() => {
    dispatch(getUser());
    console.log(users);
  }, []);

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
      </div>
      <div className='mt-3'>
        <h3 className='my-2 title'>Users List</h3>
        <Table columns={columns} dataSource={users} rowKey={(record) => record._id} />
      </div>
    </div>
  );
}

export default Dashboard;
