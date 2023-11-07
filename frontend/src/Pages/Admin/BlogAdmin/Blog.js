import React, { useState, useEffect } from 'react'
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as BlogAction from '../../../Actions/BlogAdminAction';
import { UploadOutlined, SearchOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Table, Popconfirm, Form, Input, Typography, Image, Upload, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import AddBlog from './AddBlog';

function Blog({ blogs, actions }) {
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
                    /> : <div dangerouslySetInnerHTML={{ __html: text }} ></div>
            )
        }

    });

    const [form] = Form.useForm();
    const [isAdd, setIsAdd] = useState(false);
    const [data, setData] = useState(blogs);
    const [editingKey, setEditingKey] = useState('');

    useEffect(() => {
        actions.getBlog();
    }, []);

    useEffect(() => {
        setData(blogs);
    }, [blogs]);

    const isEditing = (record) => record._id === editingKey;
    const edit = (record) => {
        form.setFieldsValue({
            ...record,
            image: [{uid: '-1', url: record.image}],
        });
        setEditingKey(record._id);
    };
    const cancel = () => {
        setEditingKey('');
    };
    const save = async (_id) => {
        // axios handler goes here (PUT)
        try {
            const row = await form.validateFields();
            actions.updateBlog({
                ...row,
                _id: _id,
                image: row.image[0].originFileObj ? URL.createObjectURL(row.image[0].originFileObj) : row.image[0].url
            });

            setEditingKey('');
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }


    };
    const handleDelete = (_id) => {
        // axios handler goes here (DELETE)
        actions.deleteBlog(_id);
        setData(blogs);
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
        key,
        ...restProps
    }) => {
        var inputNode = <Input />;
        switch (dataIndex) {
            case "fullText":
                inputNode = <ReactQuill />;
                break;
            case "image":
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
                        getValueFromEvent={dataIndex === "image" ? normfile : null}
                        valuePropName={dataIndex === "image" ? "fileList" : "value"}
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
            width: "10%"
        },
        {
            title: "Title",
            dataIndex: "title",
            editable: true,
            width: "10%",
            sorter: (a, b) => a.title.localeCompare(b.title),
            sortDirections: ['descend', 'ascend'],
            ...getColumnSearchProps('title')
        },
        {
            title: "Full Text",
            dataIndex: "fullText",
            editable: true,
            width: "30%",
            ...getColumnSearchProps('fullText')
        },
        {
            title: "Image",
            dataIndex: "image",
            editable: true,
            width: "35%",
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
            title: 'Operation',
            dataIndex: 'operation',
            colSpan: 2,
            width: "8%",
            fixed: "right",
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
            {!isAdd ? (
                <>
                    <div className='d-flex justify-content-between mb-3'>
                        <h3 className='my-2'>Blog List</h3>
                        <button className='btn btn-primary rounded-3' onClick={() => setIsAdd(!isAdd)}>Add Blog</button>
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
                        <ArrowLeftOutlined /><span className='ms-2'>Back to Blog List</span>
                    </div>
                    <AddBlog />
                </>)}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        blogs: state.blogAdmin
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(BlogAction, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Blog);