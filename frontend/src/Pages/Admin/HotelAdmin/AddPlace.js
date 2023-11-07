import React, { useEffect, useState } from 'react';
import { formItemLayout, tailFormItemLayout } from '../../../utils/customUser'
import { useDispatch, useSelector} from 'react-redux';
import { addPlace } from '../../../Actions/HotelAdminAction';
import { InboxOutlined } from '@ant-design/icons';
import { getSite } from '../../../Actions/SiteAdminAction';
import { Form, Input, Upload, Rate, Button, Row, Col, Image, Select, notification } from 'antd';

function AddPlace() {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const sites = useSelector(state => state.siteAdmin);
    const [api, contextHolder] = notification.useNotification();
    const [options, setOptions] = useState([]);

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    useEffect(() => {
        dispatch(getSite());  
    }, []);

    useEffect(() => {
        let data = [];
        sites.map(site => {
            data.push({value: site._id, label: site.name});
        });
        setOptions(data);
    }, [sites]);

    const onFinish = (values) => {
        //  axios handler goes here (POST)
        const values_ = {
            ...values,
            'placePic': URL.createObjectURL(values.placePic[0].originFileObj)
        }
        console.log('Received values of form: ', values_);
        try {
            dispatch(addPlace(values_));
            api["success"]({
                message: 'Add Place Successfully!',
                description:
                    'Return to the place list to see any reflecting changes',
            });
        } catch (error) {
            api["error"]({
                message: 'Error detected!',
                description:
                    'An error happens when adding a place.',
            });
        }
       
    };

    return (
        <div className='container'>
            {contextHolder}
            <h3 className="mb-3">Add A New Place</h3>
            <div className='row'>
                <div className='col-7'>
                    <Form
                        {...formItemLayout}
                        form={form}
                        onFinish={onFinish}
                        style={{ maxWidth: 600 }}
                        scrollToFirstError
                        initialValues={{
                            country: "",
                            ratings: 0,
                        }}
                    >
                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input Name',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="address"
                            label="Address"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input Address',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="sites"
                            label="Sites ID"
                        >
                            <Select options={options}/>
                        </Form.Item>
                        <Form.Item
                            name="country"
                            label="Country"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="placePic"
                            label="Place Picture"
                            accept=".png, .jpeg"
                            valuePropName='fileList'
                            getValueFromEvent={normFile}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please upload image',
                                },
                            ]}
                        >
                            <Upload.Dragger listType='picture'
                                beforeUpload={() => false}>
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                            </Upload.Dragger>
                        </Form.Item>
                        <Form.Item
                            name="description"
                            label="Description"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input Description',
                                },
                            ]}
                        >
                            <Input.TextArea showCount maxLength={100} />
                        </Form.Item>
                        <Form.Item
                            name="extraInfo"
                            label="Extra Info"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input Extra Info',
                                },
                            ]}
                        >
                            <Input.TextArea showCount maxLength={200} />
                        </Form.Item>
                        <Form.Item
                            name="ratings"
                            label="Rating"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please rate',
                                },
                            ]}>
                            <Rate />
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout}>
                            <Row gutter={8}>
                                <Col span={4}>
                                    <Button type="primary" htmlType="submit">
                                        Add
                                    </Button>
                                </Col>
                                <Col span={4}>
                                    <Button type="default" onClick={() => form.resetFields()}>
                                        Reset
                                    </Button>
                                </Col>
                            </Row>

                        </Form.Item>
                    </Form>
                </div>
                <Image className='col-5' style={{ mixBlendMode: "multiply" }} width={420} src='https://img.freepik.com/free-vector/lifestyle-hotel-illustration_335657-398.jpg?w=2000' />
            </div>
        </div>
    )
}

export default AddPlace