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
  const [dataClone, setDataClone] = useState(classroom);
  const [disabled, setDisabled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
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

  useEffect(() => {
    if (inputValue.trim()) {
      const newData = [...data];
      var filteredData = newData.filter(
        ({ name, description, categoryCode }) =>
          `${name}${description}${categoryCode}`
            .toUpperCase()
            .indexOf(inputValue.toUpperCase()) !== -1
      );
      setDataClone(filteredData.length === 0 ? [] : filteredData);
    } else {
      setDataClone([...data]);
    }
  }, [data, inputValue]);

  const updateHandle = () => {
    // if it's just to see user info
    if (disabled) {
      setShowModal(false);
      return;
    }

    setConfirmLoading(true);

    // axios handler goes here (PUT)

    const classroom = { ...card };

    try {
      setTimeout(() => {
        actions.updateClassroom({
          ...classroom,
        });
        setConfirmLoading(false);
        messageApi.open({
          type: "success",
          content: "Successfully update classroom!",
        });
        setShowModal(false);
      }, 2000);
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Error to update classroom!",
      });
      throw error;
    }
  };

  const onSearch = (e) => {
    setInputValue(e.target.value);
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
            onChange={(e) => onSearch(e)}
            allowClear
            suffix={<SearchOutlined />}
          />
        </Col>
      </Row>
      <List
        className="mt-4"
        grid={{ gutter: 16 }}
        dataSource={dataClone}
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
                setShowModal(true);
              }}
              actions={[
                <EditOutlined
                  onClick={() => {
                    try {
                      setCard({ ...item });
                      setDisabled(false);
                      form.setFieldsValue({
                        ...item,
                      });
                    } catch (e) {}
                    setShowModal(true);
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
            >
              <Meta title={item.name} description={item.description}></Meta>
              <Tag color={"blue"} className="mt-2" key={item._id}>
                {item.categoryCode}
              </Tag>
              <p className="mt-2 mb-2 text-[#212121] font-[580]">
                Teacher List:
              </p>
              {item?.teachers.length > 0 && (
                <div>
                  {item?.teachers.map((item, index) => (
                    <div className="mb-2">
                      <p>Teacher {index + 1}</p>
                      <p>email: {item.email || "none"}</p>
                    </div>
                  ))}
                </div>
              )}
              <p className="mt-2 mb-2 text-[#212121] font-[580]">
                Student List:
              </p>
              {item?.teachers.length > 0 && (
                <div>
                  {item?.teachers.map((item, index) => (
                    <div className="mb-2">
                      <p>Student {index + 1}</p>
                      <p>email: {item.email || "none"}</p>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </List.Item>
        )}
      ></List>
      <Modal
        mask={false}
        title={disabled ? "Classroom Info" : "Updating"}
        open={showModal}
        onOk={updateHandle}
        onCancel={() => setShowModal(false)}
        confirmLoading={confirmLoading}
      >
        <Form
          {...formItemLayout}
          form={form}
          style={{ width: 430 }}
          onValuesChange={(value) => {
            setCard({ ...card, ...value });
          }}
          disabled={disabled}
          initialValues={
            {
                isActive: "Active"
            }
        }
          scrollToFirstError
        >
          <Form.Item
            name="name"
            label="Title: "
            rules={[
              {
                required: true,
                message: "Please input title of class!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description: "
            rules={[
              {
                required: true,
                message: "Please input your description",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="categoryCode"
            label="Category: "
            rules={[
              {
                required: true,
                message: "Please input your Category code!",
              },
            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="invitationCode"
            label="Invitation: "
            rules={[
              { required: true, message: "Please input your Inviation code" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="isActive"
            label="Status"
            rules={[{ required: true, message: "Please select your Status!" }]}
          >
            <Select>
              <Select.Option value="true">Active</Select.Option>
              <Select.Option value="false">InActive</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
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
