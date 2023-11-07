import React, { useEffect } from 'react';
import { BsArrowDownRight, BsArrowUpRight } from 'react-icons/bs';
import { Table, Tag } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { getOrder } from '../../Actions/OrderAdminAction';
import { getUser } from '../../Actions/UserAdminAction';
import { getBlog } from '../../Actions/BlogAdminAction';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { Column } from '@ant-design/plots';

function Dashboard() {
  let data = [
    {
      type: "Jan",
      sales: 0,
    },
    {
      type: "Feb",
      sales: 0,
    },
    {
      type: "Mar",
      sales: 0
    },
    {
      type: "Apr",
      sales: 0,
    },
    {
      type: "May",
      sales: 0,
    },
    {
      type: "Jun",
      sales: 0,
    },
    {
      type: "July",
      sales: 0,
    },
    {
      type: "Aug",
      sales: 0,
    },
    {
      type: "Sept",
      sales: 0,
    },
    {
      type: "Oct",
      sales: 0,
    },
    {
      type: "Nov",
      sales: 0,
    },
    {
      type: "Dec",
      sales: 0,
    },
  ];

  const config = {
    data,
    xField: 'type',
    yField: 'sales',
    color: ({ type }) => {
      return '#ffd333';
    },
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: 'Month',
      },
      sales: {
        alias: 'Income',
      },
    },
  };

  const columns = [
    {
      title: "SNo",
      dataIndex: "_id",
    },
    {
      title: "Guest Number",
      dataIndex: "numOfGuest",
    },
    {
      title: "Order Status",
      dataIndex: "orderStatus",
      render: (orderStatus, _) => (
        <Tag color={orderStatus === "Processing" ? "orange" : "green"}>{orderStatus.toUpperCase()}</Tag>
      )
    },
    {
      title: "Tax Price",
      dataIndex: "taxPrice",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
    },
    {
      title: "Paid At",
      dataIndex: "paidAt",
    }
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrder());
    dispatch(getUser());
    dispatch(getBlog());
  }, [])

  const orders = useSelector(state => state.orderAdmin);
  const users = useSelector(state => state.userAdmin);
  console.log(users);
  const blogs = useSelector(state => state.blogAdmin);
  const revenue = {};
  const diff = {};

  const calculate = () => {
    orders.forEach(order => {
      const year = dayjs(order.paidAt).year();
      const month = dayjs(order.paidAt).month();
      if (typeof revenue[year] === "undefined") {
        revenue[year] = {};
        diff[year] = {};
      }

      if (revenue[year][month] !== undefined) {
        revenue[year][month] += order.totalPrice;
      } else {
        revenue[year][month] = order.totalPrice;
      }

      diff[year][month] = revenue[year][month - 1] === undefined ? 100 : parseFloat(((revenue[year][month] - (revenue[year][month - 1])) / (revenue[year][month - 1])).toFixed(2));
      data[month].sales += revenue[year][month];
    });

    console.log(data);
  };

  const styleIndex = (data) => ({
    color: data >= 0 ? 'green' : 'red'
  });

  const arrowOrientation = (data) => {
    return data >= 0 ? <BsArrowUpRight /> : <BsArrowDownRight />;
  };

  return (
    <div>
      {calculate()}
      <h3 className='mb-4'>Dashboard</h3>
      <div className='d-flex justify-content-between align-content-center gap-3 mb-3'>
        <div className='d-flex flex-grow-1 justify-content-between align-o bg-white rounded-3 p-3'>
          <div>
            <p>Users</p> <h4 className='sub-title'>{users.length}</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 style={{ color: 'green' }}> <BsArrowUpRight /> 10%</h6>
            <div className='desc'><Link to='/admin/user'>View more</Link></div>
          </div>
        </div>
        <div className='d-flex flex-grow-1 justify-content-between align-o bg-white rounded-3 p-3'>
          <div>
            <p>Blogs</p> <h4 className='sub-title'>{blogs.length}</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 style={{ color: 'green' }}> <BsArrowUpRight /> 20%</h6>
            <div className='desc'><Link to='/admin/blog'>View more</Link></div>
          </div>
        </div>
        <div className='d-flex flex-grow-1 justify-content-between align-o bg-white rounded-3 p-3'>
          <div>
            <p>Orders</p> <h4 className='sub-title'>{orders.length}</h4>
          </div>
          <div className="d-flex flex-column align-items-between">
            <h6 style={{ color: 'green' }}> <BsArrowUpRight /> 15%</h6>
            <div className='desc'><Link to='/admin/book'>View more</Link></div>
          </div>
        </div>
      </div>

      <div className='d-flex justify-content-between align-content-center gap-3'>
          {Object.entries(revenue).map(([year, value]) => {
            return (
              Object.entries(value).map(([month, data], idx) => (
                <div key ={idx} className='d-flex flex-grow-1 justify-content-between align-o bg-white rounded-3 p-3'>
                  <div>
                    <p>Total</p> <h4 className='sub-title'>${data}</h4>
                  </div>
                  <div className="d-flex flex-column align-items-end">
                    <h6 style={styleIndex(diff[year][month])}>{arrowOrientation(diff[year][month])} {diff[year][month]}%</h6>
                    <p className='desc'>{new Date(year, month).toLocaleString('default', {month: "long", year: "numeric"})}</p>
                  </div>
                </div>
                  )))
          })}
      </div>

        <div className='mt-3'>
          <h3 className='my-2 title'>Income Statistics</h3>
          <Column {...config} />
        </div>
        <div className='mt-3'>
          <h3 className='my-2 title'>Recent Orders</h3>
          <Table columns={columns} dataSource={orders} rowKey={(record) => record._id}/>
        </div>
      </div>
      )
}

      export default Dashboard;