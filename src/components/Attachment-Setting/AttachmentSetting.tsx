import React, { useState } from 'react';

import { Form, Upload } from 'antd';
import { FormProps } from 'antd/lib/index';
import { CameraOutlined } from '@ant-design/icons';


const AttachmentSetting: React.FC<FormProps> = ({ form }) => {
    const [ fileList, setFileList ] = useState([]);

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }

    const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
    }   

    const handleFormFinish = (values) => {
        console.log(values)
    }
    return (
        <div className='space-y-4'>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFormFinish}
            >
                <Form.Item
                    label="Upload"
                    name="upload_images"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}              
                >
                    <Upload
                        action="http://localhost:5000/api/upload"
                        listType="picture-card"
                        fileList={fileList}
                        onChange={handleFileChange}
                        name="image"
                        accept="image/*"
                    >
                        <CameraOutlined className="icon-uploader"/>
                    </Upload>

                </Form.Item>
         </Form>
        </div>
    )
}

export default AttachmentSetting