import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as ClassroomAction from "../../../Actions/ClassAdminAction";
import { formItemLayout } from "../../../utils/customUser";
import {
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  List,
  Card,
  Avatar,
  Modal,
  Popconfirm,
  Form,
  Input,
  Upload,
  Button,
  Select,
  Tag,
  Row,
  Col,
  message,
} from "antd";

const { Meta } = Card;

function ClassroomAdmin({ classroom, actions }) {
  const [form] = Form.useForm();
  const [card, setCard] = useState({});
  const [data, setData] = useState(classroom);
  const [disabled, setDisabled] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    actions.getClassroom();
  }, []);

  useEffect(() => {
    setData(classroom);
  }, [classroom]);

  const deleteHandle = (_id) => {
    actions.deleteClassroom(_id);
    setData(classroom);
  };

  return (
    <div className="mt-3">
      {contextHolder}
      <h3 className="my-2">Classroom List</h3>
      <Row style={{ width: "100%" }} className="mt-3 align-items-center">
        <Col span={2}>
          <b>Search: </b>{" "}
        </Col>
        <Col span={4}>
          <Input
            placeholder="input search text"
            allowClear
            suffix={<SearchOutlined />}
          />
        </Col>
      </Row>
      <List
        className="mt-4"
        grid={{ gutter: 16 }}
        // dataSource={dataClone}
        renderItem={(item) => (
          <List.Item>
            <Card
              style={{ width: 270 }}
              hoverable
              onDoubleClick={() => {
                try {
                  setCard({ ...item });
                  setDisabled(true);
                  form.setFieldsValue({
                    ...item,
                  });
                } catch (error) {
                  throw error;
                }
                // setShowModal(true);
              }}
              actions={[
                <EditOutlined
                  onClick={() => {
                    try {
                      setCard({ ...item });
                      setDisabled(false);
                      // form.setFieldsValue({
                      //     ...item,
                      //     profilePic: [{uid: '-1', url: item.profilePic}],
                      //     role: item.isAdmin ? "admin" : "user"
                      // });
                    } catch (e) {}
                    // setShowModal(true);
                  }}
                />,
                <Popconfirm
                  title="Sure to delete?"
                  onConfirm={() => deleteHandle(item._id)}
                >
                  <span style={{ cursor: "pointer" }}>
                    <DeleteOutlined />
                  </span>
                </Popconfirm>,
              ]}
            ></Card>
          </List.Item>
        )}
      ></List>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    classroom: state.classroomAdmin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(ClassroomAction, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClassroomAdmin);
