import React, { useState, useEffect } from 'react'
import 'react-quill/dist/quill.snow.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PlaceAction from '../../../Actions/HotelAdminAction';
import { UploadOutlined, SearchOutlined, ArrowLeftOutlined, EyeOutlined } from '@ant-design/icons';
import { Table, Popconfirm, Form, Input, Typography, Image, Upload, Button, Space, Rate, InputNumber, message } from 'antd';
import Highlighter from 'react-highlight-words';
import { useHistory } from 'react-router-dom';
import AddPlace from './AddPlace';

function Hotel({ places, actions }) {
    const [messageApi, contextHolder] = message.useMessage();
    const history = useHistory();
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
        actions.getPlace();
    }, []);

    useEffect(() => {
        setData(places);
    }, [places]);

    const edit = (record) => {
        form.setFieldsValue({
            ...record,
            placePic: [{ uid: '-1', url: record.placePic }],
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
            console.log("Row", row);
            actions.updatePlace(
                {
                    ...row,
                    _id: _id,
                    placePic: row.placePic[0].originFileObj ? URL.createObjectURL(row.placePic[0].originFileObj) : row.placePic[0].url
                });
            setEditingKey('');

        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }

    };
    const handleDelete = (_id) => {
        // axios handler goes here (DELETE)
        actions.deletePlace(_id, messageApi);
        setData(places);
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
        var inputNode = <Input />;
        switch (dataIndex) {
            case "numReview":
                inputNode = <InputNumber />
                break;
            case "ratings":
                inputNode = <Rate />;
                break;
            case "placePic":
                inputNode =
                    <Upload
                        accept=".png, .jpeg"
                        listType="picture-card"
                        beforeUpload={() => false}
                        maxCount={1}
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
                        getValueFromEvent={dataIndex === "placePic" ? normfile : null}
                        valuePropName={dataIndex === "placePic" ? "fileList" : "value"}
                        rules={[
                            {
                                required: true,
                                message: `Please Input ${title}!`,
                            },
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
            title: "Name",
            dataIndex: "name",
            editable: true,
            width: "10%",
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortDirections: ['descend', 'ascend'],
            ...getColumnSearchProps('name')
        },
        {
            title: "Address",
            dataIndex: "address",
            editable: true,
            width: "10%",
            ...getColumnSearchProps('address')
        },
        {
            title: "Country",
            dataIndex: "country",
            editable: true,
            width: "10%",
            ...getColumnSearchProps('country')
        },
        {
            title: "Place Picture",
            dataIndex: "placePic",
            editable: true,
            width: "10%",
            render: (imgs, _) => {
                return (
                    <div className='row'>
                        <div className='col-3 me-2'>
                            <Image className='me-2' width={50} height={50} src={imgs} />
                        </div>
                    </div>
                )
            }
        },
        {
            title: "Description",
            dataIndex: "description",
            editable: true,
            width: "10%",
            ...getColumnSearchProps('description')
        },
        {
            title: "Extra Info",
            dataIndex: "extraInfo",
            editable: true,
            width: "10%",
            ...getColumnSearchProps('extraInfo')
        },
        {
            title: "Ratings",
            dataIndex: "ratings",
            editable: true,
            width: "10%",
            sorter: (a, b) => a.ratings - b.ratings,
            sortDirections: ['ascend', 'descend'],
            filters: [{
                text: 1,
                value: 1
            },
            {
                text: 2,
                value: 2
            },
            {
                text: 3,
                value: 3
            },
            {
                text: 4,
                value: 4
            },
            {
                text: 5,
                value: 5
            }
            ],
            onFilter: (value, record) => {
                return record.ratings === value;
            },
            render: (value) => (
                <Rate value={value} className='fs-5' />
            )
        },
        {
            title: "Review Number",
            dataIndex: "numReviews",
            editable: false,
            width: "10%",
            render: (value, record) => (
                <div className='d-flex justify-content-around align-items-center'>
                    <div>{value}</div>
                    <div><Button icon={<EyeOutlined />}
                        onClick={() => {
                            history.push({ pathname: `/api/place/user/review`, search: `?id=${record._id}`});
                        }} /></div>
                </div>
            ),
        },
        {
            title: 'Operation',
            dataIndex: 'operation',
            colSpan: 2,
            fixed: "right",
            width: "8%",
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
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <span style={{ cursor: "pointer", textAlign: "center" }}>Cancel</span>
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
            fixed: "right",
            colSpan: 0,
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
            {contextHolder}
            {!isAdd ? (
                <>
                    <div className='d-flex justify-content-between mb-3'>
                        <h3 className='my-2'>Place List</h3>
                        <button className='btn btn-primary rounded-3' onClick={() => setIsAdd(!isAdd)}>Add Place</button>
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
            ) : (
                <>
                    <div
                        className='text-primary mb-3 d-flex align-items-center'
                        style={{ cursor: "pointer" }}
                        onClick={() => setIsAdd(false)}
                    >
                        <ArrowLeftOutlined /><span className='ms-2'>Back to Place List</span>
                    </div>
                    <AddPlace setIsAdd={setIsAdd} />
                </>)}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        places: state.hotelAdmin
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(PlaceAction, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Hotel);