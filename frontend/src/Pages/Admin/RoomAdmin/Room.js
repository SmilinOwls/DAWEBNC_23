import React, { useState, useEffect } from 'react'
import 'react-quill/dist/quill.snow.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as RoomAction from '../../../Actions/RoomAdminAction';
import { UploadOutlined, SearchOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Table, Popconfirm, Form, Input, Typography, Image, Upload, Button, Space, InputNumber, DatePicker, Rate } from 'antd';
import Highlighter from 'react-highlight-words';
import dayjs from 'dayjs';
import AddRoom from './AddRoom';
import { dateFormat } from '../../../utils/customUser';

function Room({ rooms, actions }) {
    // Search 
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (confirm, clearFilters) => {
        clearFilters();
        setSearchText('');
        confirm();
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => {
            return (
                <div
                    style={{
                        padding: 8,
                    }}
                    onKeyDown={(e) => e.stopPropagation()}
                >
                    <Input
                        placeholder={`Search ${dataIndex}`}
                        value={selectedKeys[0]}
                        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        style={{
                            marginBottom: 8,
                            display: 'block',
                        }}
                    />
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                            icon={<SearchOutlined />}
                            size="small"
                            style={{
                                width: 90,
                            }}
                        >
                            Search
                        </Button>
                        <Button
                            onClick={() => clearFilters && handleReset(confirm, clearFilters)}
                            size="small"
                            style={{
                                width: 90,
                            }}
                        >
                            Reset
                        </Button>
                        <Button
                            type="link"
                            size="small"
                            onClick={() => {
                                close();
                            }}
                        >
                            Close
                        </Button>
                    </Space>
                </div>
            )
        },
        filterIcon: (filtered) => {
            return (
                <SearchOutlined
                    style={{
                        color: filtered ? '#1677ff' : undefined,
                    }}
                />
            )
        },
        onFilter: (value, record) => {
            return record[dataIndex].toString().toLowerCase().includes(value.toLowerCase());
        },
        render: (text) => {
            return (
                searchedColumn === dataIndex ?
                    <Highlighter
                        highlightStyle={{
                            backgroundColor: '#ffc069',
                            padding: 0,
                        }}

                        searchWords={[searchText]}
                        autoEscape
                        textToHighlight={text ? text.toString() : ''}
                    /> : (text)
            )
        }

    });

    const [form] = Form.useForm();
    const [isAdd, setIsAdd] = useState(false);
    const [data, setData] = useState();
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record._id === editingKey;

    useEffect(() => {
        actions.getRoom();
    }, []);

    useEffect(() => {
        setData(rooms);
    }, [rooms]);

    const edit = (record) => {
        console.log(record);
        form.setFieldsValue({
            ...record,
            photos: record.photos.map((photo, idx) => ({uid: idx, url: photo})),
        });
        setEditingKey(record._id);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (_id) => {
        //  axios handler goes here (PUT)
        try {
            const row = await form.validateFields();
            
            actions.updateRoom(
                {
                    ...row,
                    _id: _id,
                    checkIn: typeof row["checkIn"] === 'string' ? row["checkIn"] : ((row["checkIn"] && row["checkIn"].format(dateFormat)) || ''),
                    checkOut: typeof row["checkOut"] === 'string' ? row["checkOut"] : ((row["checkOut"] && (row["checkOut"].format(dateFormat))) || ''),
                    photos: row.photos.map(photo => photo.originFileObj ? URL.createObjectURL(photo.originFileObj) : photo.url)
                });
            setEditingKey('');
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };
    const handleDelete = (_id) => {
        // axios handler goes here (DELETE)
        actions.deleteRoom(_id);
        setData(rooms);
    };
    const normfile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };
    const EditableCell = ({
        editing,
        dataIndex,
        title,
        record,
        index,
        children,
        ...restProps
    }) => {
        var inputNode = ["price", "countInStock", ",maxGuests", "ratings", "coupon", "numOfBed"].indexOf(dataIndex) === -1 ? <Input /> : <InputNumber min={0} />;
        switch (dataIndex) {
            case "ratings":
                inputNode = <Rate />;
                break;
            case "checkIn":
                inputNode = <DatePicker showTime format={dateFormat} />;
                break;
            case "checkOut":
                inputNode = <DatePicker showTime format={dateFormat} />;
                break;
            case "photos":
                inputNode =
                    <Upload
                        accept=".png, .jpeg"
                        listType="picture-card"
                        beforeUpload={() => false}
                    >
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>;
                break;
            default:
                break;
        }

        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item
                        name={dataIndex}
                        style={{
                            margin: 0,
                        }}
                        getValueFromEvent={dataIndex === "photos" ? normfile : null}
                        valuePropName={dataIndex === "photos" ? "fileList" : "value"}
                        getValueProps={(value) => {
                            if (["checkIn", "checkOut"].includes(dataIndex)) {
                                return { value: dayjs(value, dateFormat) }
                            } else{
                                if (["photos"].includes(dataIndex)) {
                                    return { fileList: value }
                                } 
                            }
                            return { value: value }
                        }}
                        rules={[
                            {
                                required: ["place", "title","desription", "maxGuests", "price"].includes(dataIndex) ? true : false,
                                message: `Please Input ${title}!`,
                            },
                            
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if ((
                                        dataIndex === "checkOut" &&
                                        dayjs(getFieldValue('checkIn')) &&
                                        dayjs(getFieldValue('checkIn')) > dayjs(value))
                                        ||
                                        (
                                            dataIndex === "checkIn" &&
                                            dayjs(getFieldValue('checkOut')) &&
                                            dayjs(getFieldValue('checkOut')) < dayjs(value)
                                        )) {
                                        return Promise.reject(new Error('The checkout date must be greater than checkin!'));
                                    }

                                    return Promise.resolve();
                                },
                            }),
                        ]}

                    >
                        {inputNode}
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        );
    };
    const columns = [
        {
            title: "SNo",
            dataIndex: "_id",
            width: "5%"
        },
        {
            title: "Title",
            dataIndex: "title",
            editable: true,
            width: "7%",
            sorter: (a, b) => a.title.localeCompare(b.title),
            sortDirections: ['descend', 'ascend'],
            ...getColumnSearchProps('title')
        },
        {
            title: "Photos",
            dataIndex: "photos",
            editable: true,
            width: "9%",
            render: (imgs, _) => {
                return (
                    <div className='row'>
                        {imgs.map((img, idx) => (
                            <div className='col-3 me-4' key={idx}>
                                <Image className='me-2' width={50} height={50} src={img} />
                            </div>
                        )
                        )}
                    </div>
                )
            }
        },
        {
            title: "Description",
            dataIndex: "description",
            editable: true,
            width: "8%",
            ...getColumnSearchProps('description')
        },
        {
            title: "Type Room",
            dataIndex: "typeRoom",
            editable: true,
            width: "6%",
            ...getColumnSearchProps('typeRoom')
        },
        {
            title: "Coupon",
            dataIndex: "coupon",
            editable: true,
            width: "8%",
            sorter: (a, b) => a.cost - b.cost,
            sortDirections: ['ascend', 'descend']

        },
        {
            title: "Bed Number",
            dataIndex: "numOfBed",
            editable: true,
            min: 0,
            width: "8%",
            sorter: (a, b) => a.numOfBed - b.numOfBed,
            sortDirections: ['ascend', 'descend']
        },
        {
            title: "Checkin",
            dataIndex: "checkIn",
            editable: true,
            width: "8%",
            sorter: (a, b) => a.checkIn - b.checkIn,
            sortDirections: ['ascend', 'descend'],
        },
        {
            title: "Checkout",
            dataIndex: "checkOut",
            editable: true,
            width: "8%",
            sorter: (a, b) => a.checkOut - b.checkOut,
            sortDirections: ['ascend', 'descend'],
        },
        {
            title: "Max Guests",
            dataIndex: "maxGuests",
            editable: true,
            width: "7%",
            sorter: (a, b) => a.maxGuests - b.maxGuests,
            sortDirections: ['ascend', 'descend']
        },
        {
            title: "Price",
            dataIndex: "price",
            editable: true,
            width: "8%",
            sorter: (a, b) => a.price - b.price,
            sortDirections: ['ascend', 'descend']
        },
        {
            title: "Ratings",
            dataIndex: "ratings",
            editable: true,
            width: "6%",
            sorter: (a, b) => a.ratings - b.ratings,
            sortDirections: ['ascend', 'descend'],
        },
        {
            title: 'Operation',
            dataIndex: 'operation',
            colSpan: 2,
            fixed: "right",
            width: "7%",
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span className='row'>
                        <Typography.Link
                            onClick={() => save(record._id)}
                            style={{
                                marginRight: 8,
                                textAlign: "center"
                            }}
                        >
                            Save
                        </Typography.Link>
                        <Popconfirm
                            title="Sure to cancel?"
                            onConfirm={cancel}
                        >
                            <span style={{ cursor: "pointer", textAlign: "center" }} >Cancel</span>
                        </Popconfirm>
                    </span>
                ) : (
                    <span>
                        {data.length >= 1 ? (
                            <>
                                <span className='d-flex justify-content-center'>
                                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                                        <span style={{ cursor: "pointer" }}>Edit</span>
                                    </Typography.Link>
                                </span>
                            </>
                        ) : null}
                    </span>
                );
            },
        },
        {
            title: 'Action',
            dataIndex: 'action',
            colSpan: 0,
            fixed: "right",
            render: (_, record) => {
                return (
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record._id)}>
                        <span className='text-primary' style={{ cursor: "pointer" }}>Delete</span>
                    </Popconfirm>
                )
            }
        }
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <div className='mt-3'>
            {!isAdd ? (
                <>
                    <div className='d-flex justify-content-between mb-3'>
                        <h3 className='my-2'>Room List</h3>
                        <button className='btn btn-primary rounded-3' onClick={() => setIsAdd(!isAdd)}>Add Room</button>
                    </div>
                    <Form form={form} component={false}>
                        <Table
                            components={{
                                body: {
                                    cell: EditableCell,
                                },
                            }}
                            bordered
                            dataSource={data}
                            columns={mergedColumns}
                            rowKey={(record) => record._id}
                            rowClassName="editable-row"
                            pagination={{
                                onChange: cancel,
                            }}
                            scroll={{
                                x: 1500,
                                y: 300,
                            }}
                        />
                    </Form>
                </>
            ) :
                (
                    <>
                        <div
                            className='text-primary mb-3 d-flex align-items-center'
                            style={{ cursor: "pointer" }}
                            onClick={() => setIsAdd(false)}
                        >
                            <ArrowLeftOutlined /><span className='ms-2'>Back to Room List</span>
                        </div>
                        <AddRoom setIsAdd={setIsAdd} />
                    </>)
            }
        </div>
    )
}


const mapStateToProps = state => {
    return {
        rooms: state.roomAdmin
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(RoomAction, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Room);