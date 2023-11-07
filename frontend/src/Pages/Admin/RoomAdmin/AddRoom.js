import React, { useEffect, useState } from 'react';
import {formItemLayout, tailFormItemLayout} from '../../../utils/customUser'
import { useDispatch, useSelector} from 'react-redux';
import { addRoom } from '../../../Actions/RoomAdminAction';
import { getPlace } from '../../../Actions/HotelAdminAction';
import { getUser } from '../../../Actions/UserAdminAction';
import { InboxOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, Input, Upload, DatePicker, Button, Row, Col, Image, InputNumber, Select, Rate, notification } from 'antd';
const { RangePicker } = DatePicker;

function AddRoom() {
    const [api, contextHolder] = notification.useNotification();
    const [form] = Form.useForm();

    const dispatch = useDispatch();
    const places = useSelector(state => state.hotelAdmin);
    const users = useSelector(state => state.userAdmin);
    const [options, setOptions] = useState({});

    useEffect(() => {
        dispatch(getUser());
        dispatch(getPlace());  
    }, []);
    console.log(places);
    useEffect(() => {
        let data = {"users": [], "places": []};
        users.map(user => {
            data["users"].push({value: user._id, label: user.username});
        });
        places.map(place => {
            data["places"].push({value: place._id, label: place.name});
        });
        setOptions(data);
    }, [users, places]);

    const normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const onFinish = (values) => {
        //  axios handler goes here (POST)
        const rangeTimeValue = values['range-time-picker'] === undefined ? '' : values['range-time-picker'];
        if(rangeTimeValue) delete values['range-time-picker'];
        const values_ = {
            ...values,
            'checkIn': rangeTimeValue === '' ? '' : rangeTimeValue[0].format('MM/DD/YYYY HH:mm'),
            'checkOut': rangeTimeValue === '' ? '' : rangeTimeValue[1].format('MM/DD/YYYY HH:mm'),
            'photos': values.photos.map(photo => URL.createObjectURL(photo.originFileObj))
        }
        console.log('Received values of form: ', values_);
        try {
            dispatch(addRoom(values_));
            api["success"]({
                message: 'Add Room Successfully!',
                description:
                    'Return to the blog list to see any reflecting changes',
            });
        } catch (error) {
            api["error"]({
                message: 'Error detected!',
                description:
                    'An error happens when adding a room.',
            });
        }
    };

    return (
        <div className='container'>
            {contextHolder}
            <h3 className="mb-3">Add A New Room</h3>
            <div className='row'>
                <div className='col-7'>
                    <Form
                        {...formItemLayout}
                        form={form}
                        onFinish={onFinish}
                        style={{ maxWidth: 600 }}
                        scrollToFirstError
                        initialValues={{
                            typeRoom: "Standard",
                            coupon: 0,
                            numOfBed: 0,
                            ratings: 0,
                            countInStock: 0
                        }}
                    >
                        <Form.Item
                            name="owner"
                            label="Owner"
                            
                        >
                            <Select options={options["users"]}/>
                        </Form.Item>
                        <Form.Item
                            name="place"
                            label="Place"
                            
                        >
                            <Select options={options["places"]}/>
                        </Form.Item>
                        <Form.Item
                            name="title"
                            label="Title"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input Title',
                                },
                            ]}
                        >
                            <Input />
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
                            name="typeRoom"
                            label="Type Room"
                        >
                            <Input placeholder='Standard' />
                        </Form.Item>
                        <Form.Item
                            name="photos"
                            label="Photos"
                            valuePropName='fileList'
                            getValueFromEvent={normFile}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please upload photos',
                                },
                            ]}
                        >
                            <Upload.Dragger
                                accept=".png, .jpeg"
                                listType='picture'
                                beforeUpload={() => false}>
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                            </Upload.Dragger>
                        </Form.Item>
                        <Form.List
                            name="perks"
                            rules={[
                                {
                                    validator: async (_, names) => {
                                        if (!names || names.length < 1) {
                                            return Promise.reject(new Error('At least 1 perk'));
                                        }
                                    },
                                },
                            ]}
                            initialValue={[""]}
                        >
                            {(fields, { add, remove }, { errors }) => (
                                <>
                                    {fields.map((field, index) => (
                                        <Form.Item
                                            {...(index === 0 ? formItemLayout : tailFormItemLayout)}
                                            label={index === 0 ? 'Perks' : ''}
                                            required={true}
                                            key={field.key}
                                        >
                                            <Form.Item
                                                {...field}
                                                validateTrigger={['onChange', 'onBlur']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        whitespace: true,
                                                        message: "Please input perk or delete this field.",
                                                    },
                                                ]}
                                                noStyle
                                            >
                                                <Input
                                                    style={{
                                                        width: '60%',
                                                    }}
                                                />
                                            </Form.Item>
                                            {fields.length > 1 ? (
                                                <MinusCircleOutlined
                                                    className="dynamic-delete-button"
                                                    onClick={() => remove(field.name)}
                                                />
                                            ) : null}
                                        </Form.Item>
                                    ))}
                                    <Form.Item {...tailFormItemLayout}>
                                        <Button
                                            type="dashed"
                                            onClick={() => add()}
                                            style={{
                                                width: '60%',
                                            }}
                                            icon={<PlusOutlined />}
                                        >
                                            Add field
                                        </Button>
                                        <Form.ErrorList errors={errors} />
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                        <Form.Item
                            name="coupon"
                            label="Coupon"
                            rules={[
                                {
                                    type: 'number',
                                    message: 'Please input Coupon',
                                },
                            ]}
                        >
                            <InputNumber min={0}/>
                        </Form.Item>
                        <Form.Item
                            name="numOfBed"
                            label="Bed Number"
                            rules={[
                                {
                                    type: 'number',
                                    message: 'Please input Bed Number',
                                },
                            ]}
                        >
                            <InputNumber min={0}/>
                        </Form.Item>
                        <Form.Item
                            name="range-time-picker"
                            label="Check[in][out]"
                            rules={[{
                                type: 'array',
                                message: 'Please select Time'
                            }]}>
                            <RangePicker showTime format="YYYY-MM-DD HH:mm" />
                        </Form.Item>
                        <Form.Item
                            name="maxGuests"
                            label="Max Guests"
                            rules={[
                                {
                                    required: true,
                                    type: 'number',
                                    message: 'Please input Max Guests',
                                },
                            ]}
                        >
                            <InputNumber min={0}/>
                        </Form.Item>
                        <Form.Item
                            name="price"
                            label="Price"
                            rules={[
                                {
                                    required: true,
                                    type: 'number',
                                    message: 'Please input Price',
                                },
                            ]}
                        >
                            <InputNumber min={0} />
                        </Form.Item>
                       
                        <Form.Item
                            name="ratings"
                            label="Ratings"
                            rules={[
                                {
                                    type: 'number',
                                    message: 'Please select Ratings',
                                },
                            ]}
                        >
                            <Rate />
                        </Form.Item>
                        <Form.Item
                            name="countInStock"
                            label="Count In Stock"
                            rules={[
                                {
                                    type: 'number',
                                    message: 'Please input count in stock',
                                },
                            ]}
                        >
                            <InputNumber min={0}/>
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
                <Image className='col-5' style={{ mixBlendMode: "multiply" }} width={420} src='https://img.freepik.com/free-vector/hotel-room-with-bed-interior-design-background-window-with-curtains-bed-with-pillows-towels-lamp-happy-holiday-vacation-staying-modern-hotel-with-view-city_575670-2063.jpg' />
            </div>
            
        </div>
    )
}

export default AddRoom