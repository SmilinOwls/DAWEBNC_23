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

  useEffect(() => {
    dispatch(getUser());
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
    </div>
  );
}

export default Dashboard;
