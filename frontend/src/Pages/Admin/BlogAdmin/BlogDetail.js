import React from 'react'
import CustomInput from '../../../Components/Admin/CustomInpur';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

function BlogDetail({formData, handleChange}) {
    return (
        <>
            <div className="mt-3 w-50">
                <form action="" method="">
                    <h5>Title</h5>
                    <CustomInput type="text" name="title" label="Enter blog title..." value={formData.title} onChange={handleChange}/>
                    <h5>Full Text</h5>
                    <ReactQuill theme="snow" placeholder='Enter blog content...' value={formData.fullText} onChange={handleChange} className="bg-white h-50" />
                </form>
            </div>
        </>
    )
}

export default BlogDetail;