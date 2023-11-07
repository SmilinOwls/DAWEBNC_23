import React from 'react'
import { Button, Form, Input, Image, notification } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useDispatch } from 'react-redux';
import { addBlog } from '../../../Actions/BlogAdminAction';

function BlogSummary({ formData }) {
    const dispatch = useDispatch();
    const [api, contextHolder] = notification.useNotification();
    const { title, fullText, image } = formData;
    const formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 14 },
    };
    const onFinish = (values) => {
        // axios handler goes here (POST)
        const values_ = {
            ...values,
            'image': URL.createObjectURL(values.image[0].originFileObj)
        }
        console.log('Received values of form: ', values_);
        try {
            dispatch(addBlog(values_));
            api["success"]({
                message: 'Add Blog Successfully!',
                description:
                    'Return to the blog list to see any reflecting changes',
            });
        } catch (error) {
            api["error"]({
                message: 'Error detected!',
                description:
                    'An error happens when adding a blog.',
            });
        }
    };
    return (
        <div className='row'>
            <div className='col-7'>
                <Form
                    name="dynamic_rule"
                    style={{
                        maxWidth: 1200,
                    }}
                    initialValues={{
                        title: title,
                        fullText: fullText,
                        image: image
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        {...formItemLayout}
                        name="title"
                        label="Blog Title"
                    >
                        <Input value={title} placeholder={title} readOnly={true} disabled={true} className="ms-2" />
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        name="fullText"
                        label="Full Text"
                    >
                        <div className="ms-2">
                            <TextArea value={fullText} placeholder={fullText} rows={8} readOnly={true} disabled={true} />
                            <div dangerouslySetInnerHTML={{ __html: fullText }} className="my-3"></div>
                        </div>
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        name="image"
                        label="Blog Image"
                    >
                        <div className='container'>
                            <div className='row'>
                                {image.map((img, idx) => (
                                    <div className='col-3 mb-2' key={idx}>
                                        <Image src={img.thumbUrl} width={80} height={80} key={idx} />
                                    </div>
                                )
                                )}
                            </div>
                        </div>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
                        {contextHolder}
                        <Button type="primary" htmlType="submit" className='ms-2'>
                            Submit
                        </Button>
                    </Form.Item>
                </Form >
            </div>
            <Image className='col-2' style={{ mixBlendMode: "multiply" }} width={420} src={'https://img.freepik.com/free-vector/blogging-illustration-concept_114360-851.jpg?w=2000'} />
        </div>

    )
}

export default BlogSummary