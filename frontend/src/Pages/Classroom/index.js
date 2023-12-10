import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import classroomApi from "../../Services/classroomApi";
import { listImages } from "../../Constants/ListImage";
import hero01 from "../../Assets/images/Course.png";
import hero02 from "../../Assets/images/what-is-ui.jpg";
import heroVideo from "../../Assets/images/Mern.png";
import { Dropdown } from "antd";
import { EllipsisOutlined, DoubleRightOutlined, CopyOutlined, LinkOutlined, EditOutlined, ContainerOutlined, } from "@ant-design/icons";
import "./styles.css";

const Classroom = () => {
  const [classroomList, setClassroomList] = useState([]);
  const history = useHistory();
  const handleCreateClass = () => {
    history.push("/create-class");
  };

  const renderListImage = () => {
    return Math.floor(Math.random() * classroomList.length + 1);
  };

  const handleGetClassroom = async () => {
    try {
      const response = await classroomApi.getClassroomByCreatedUser();
      setClassroomList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const menuProps = (item) => {
    const items = [
      {
        label: "Move",
        key: "0",
        icon: <DoubleRightOutlined />,
        onClick: () => {},
      },
      {
        label: "Copy invite link",
        key: "1",
        icon: <LinkOutlined />,
        onClick: () => {
          navigator.clipboard.writeText(
            `http://localhost:5000/api/classroom/${item._id}/join/link?cjc=${item.invitationCode}`
          );
        },
      },
      {
        label: "Edit",
        key: "2",
        icon: <EditOutlined />,
        onClick: () => {},
      },
      {
        label: "Copy",
        key: "3",
        icon: <CopyOutlined />,
        onClick: () => {},
      },
      {
        label: "Archive",
        key: "4",
        icon: <ContainerOutlined />,
        onClick: () => {},
      },
    ];

    return {
      items,
    }
  };

  useEffect(() => {
    handleGetClassroom();
  }, []);

  return (
    <div className="w-full px-[60px] mb-[100px]">
      <section className="mb-5 pb-4 border-b border-[#efefef]">
        <Container>
          <Row>
            <Col lg="6">
              <div className="hero__content">
                <div className="hero__subtitle d-flex align-items-center">
                  <h3 className="section__subtitle">Know Before you started</h3>
                </div>
                <h1>
                  Learn HTML5 , CSS3 , Web Apps &
                  <span className="highlight">More</span>
                </h1>
                <p>
                  Learn How To Build Websites & Apps Write A Code Or Start A
                  Business
                </p>
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box">
                <img src={hero01} alt="" />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box hero__video-box mt-4">
                <img src={heroVideo} alt="" />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box mt-5">
                <img src={hero02} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <div className="flex items-center justify-end pl-5 mb-10">
        <button
          className="px-3 py-2 rounded-lg flex items-center justify-center hover:bg-[#6DB9EF] bg-[#3081D0] text-white text-[16px] font-semibold"
          onClick={handleCreateClass}
        >
          Create Class
        </button>
      </div>
      <div className="flex items-center justify-center">
        <p className="text-black text-center font-semibold text-[25px] my-6">
          Courses
        </p>
      </div>
      {classroomList.length > 0 ? (
        <div className="flex gap-4 flex-wrap items-center">
          {classroomList.map((item, index) => (
            <div key={index} className="border rounded-xl w-[25%] flex flex-col">
              <div className="w-full h-[200px] relative">
                <img
                  src={listImages[renderListImage()]}
                  alt="classroom"
                  className="w-full h-full object-cover rounded-t-xl"
                />
                <Dropdown.Button
                  menu={menuProps(item)}
                  trigger={["click"]}
                  buttonsRender={([]) => [
                    <div />,
                    <div className="rotate-90 absolute top-2 right-2 cursor-pointer p-2 rounded-3xl hover:bg-zinc-400/30">
                      <EllipsisOutlined className="text-[32px] text-slate-100" />
                    </div>,
                  ]}
                />
              </div>
              <div className="border rounded-xl bg-white p-4">
                <p className="text-black font-semibold text-[18px] mb-3">
                  Subject: {item.name}
                </p>
                <p className="text-black mb-3">
                  Description:{" "}
                  {item.description?.length > 50
                    ? item.description.slice(0, 50) + "..."
                    : item.description}
                </p>
                <p className="text-black mb-4">Level: {item.categoryCode}</p>
                <button className="mt-6 flex items-center border justify-center hover:bg-white hover:border hover:border-[#3081D0] hover:!text-[#3081D0] transition text-center px-3 py-2 rounded-xl bg-[#3081D0] text-white font-semibold">
                  Detail
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <p className="text-[22px] font-bold text-center">
            No classes created
          </p>
        </div>
      )}
    </div>
  );
};

export default Classroom;
