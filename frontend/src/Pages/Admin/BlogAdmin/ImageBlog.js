import React, { useState } from 'react'
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, Modal } from 'antd';

function ImageBlog({ formData, setFormData }) {
    const [imagePreview, setImagePreview] = useState(null);
    const [open, setOpen] = useState(true);
    const handleUpload = ({ fileList }) => {
        setFormData({ ...formData, image: fileList });
        console.log(formData);
    }

    return (
        <>
            <h5>Image</h5>
            <Upload
                listType="picture-card"
                fileList={formData.image}
                accept=".png, .jpeg"
                onPreview={(file) => { setImagePreview(file); setOpen(true); }}
                beforeUpload={() => false}
                onChange={handleUpload}
                maxCount={1}
            >
                <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
            {imagePreview !== null && <Modal open={open} onCancel={() => setOpen(false)} footer={<Button key="ok" type="primary" onClick={() => setImagePreview(null)}>
                OK
            </Button>}>
                <div className='container'>
                    <div className='row'>
                        <div className='col'>
                        <img src={imagePreview.thumbUrl} className={{ width: "100%" }} alt="" />
                        </div>
                        <div className='col'>
                        <p className='fs-5'><b>Name:</b> {imagePreview.name}</p>
                        <p className='fs-5'><b>Size:</b> {imagePreview.size}</p>
                        <p className='fs-5'><b>Date:</b> {imagePreview.lastModifiedDate.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </Modal>
            }
        </>
    )
}

export default ImageBlog;