import React, { useCallback, useState } from 'react';

import { Button, Flex, Input, Tooltip, Form } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { FormProvider } from 'antd/es/form/context';

import ContentSetting from '../Content-Setting/Content-Setting.tsx';
import AttachmentSetting from '../Attachment-Setting/AttachmentSetting.tsx';
import DynamicSetting from '../Dynamic-Setting/Dynamic-Setting.tsx';
import PreviewDrawer from '../Preview-Drawer/Preview-Drawer.tsx';
import { Value } from 'react-quill';

interface ImageProps {
    "uid": string,
    "lastModified": number,
    "lastModifiedDate":string,
    "name": string,
    "size": number,
    "type": string,
    "percent": number,
    "originFileObj": {
        "uid": string
    },
    "error": {
        "isTrusted": boolean
    },
    "status": string,
    "thumbUrl": string
}

export interface FormData {
  subject: string;
  content: Value;
  fromName: string;
  fromEmail: string;
  replyTo: string;
  bcc: string;
  cc: string;
  toEmail: string;
  fromDateTime: string;
  upload_images: ImageProps[];
  dynamic: []
}

interface FieldsData {
  field_id: number;
  field_name: string
}


const Template: React.FC = () => {
  const [form1] = Form.useForm();
  const [form3] = Form.useForm();
  const [form2] = Form.useForm();

  const [open, setOpen] = useState<boolean>(false)
  const [isCreated, setIsCreated] = useState<boolean>(true)
  const [selectedField, setSelectedField] = useState<number>(1)
  const [inputField, setInputField] = useState<string>('')

  const [data, setData] = useState<FormData>({
    "subject": "",
    "content": "",
    "toEmail": "",
    "fromName": "",
    "fromEmail": "",
    "replyTo": "",
    "bcc": "",
    "fromDateTime": "",
    "upload_images": [],
    "dynamic": [],
    "cc": ""
  })
  const [fieldsKey, setFieldsKey] = useState<FieldsData[]>(
    [
      { field_id: 1, field_name: 'Content'},
      // { field_id: 2, field_name: 'Auto-reply'},
      { field_id: 2, field_name: 'Attachments'},
      // { field_id: 4, field_name: 'Contacts'},
      // { field_id: 5, field_name: 'Setting'},
    ]
  )

  const hdAddNewOne = useCallback(() => {
    setFieldsKey((prev) => [
      ...prev, 
      {
        field_id: fieldsKey.length + 1 , field_name: inputField
      }
    ])
    setInputField('')
  }, [inputField, fieldsKey])


  const handePreview = () => {
    form1.validateFields().then(values1 => {
      const values2 = form2.getFieldsValue('upload_images');
      const values3 = form3.getFieldsValue('dynamic');

      let combinedData = { ...values1.items[0]};
      if (values2){
        combinedData = { ...combinedData, ...values2};
      }
      if (values3){
        combinedData = { ...combinedData, ...values3};
      }
      console.log("combinedData", combinedData)
      setData(combinedData)
      showDrawer();

    }).catch(errorInfo1 => {
      console.error('Form 1 Validation Failed:', errorInfo1);
    });
  }

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <FormProvider>
        {
          isCreated 
              ? <h1 className='font-bold text-lg'>My Default Template</h1> 
              : <Button onClick={() => setIsCreated((isCreated) => !isCreated)} type="primary">Create Template</Button>
        }
        {
          isCreated &&
          <>
            <Flex gap="small" wrap className='my-4' justify="space-between">
              <Flex gap="small">
                {
                  fieldsKey.map((item) => (
                    <Button style={{ background: selectedField === item.field_id ? 'red' : 'white'}} onClick={() => setSelectedField(item.field_id)} key={item.field_id} type="dashed">{item.field_name}</Button>
                  ))
                }
                <Tooltip title={
                  <Input value={inputField} placeholder="Add Field Key" onChange={(e) => setInputField(e.target.value)} suffix={<PlusCircleOutlined  onClick={hdAddNewOne} />} />
                }>
                  <Button type="dashed" className='flex items-center'>
                      <PlusCircleOutlined />
                  </Button>
                </Tooltip>
              </Flex>
            </Flex>

            <div style={{ display: selectedField === 1 ? 'block' : 'none'}}>
              <ContentSetting form={form1} />
            </div>
            <div style={{ display: selectedField === 2 ? 'block' : 'none'}}>
              <AttachmentSetting form={form2}/> 
            </div>
            <div style={{ display: selectedField === 3 ? 'block' : 'none'}}>
              <DynamicSetting form={form3}/>
            </div>

            <Flex gap="large" className='mt-4'>
              {/* <Button type="primary" htmlType="submit" onClick={handleFinish}>Submit</Button> */}
              <PreviewDrawer data={data} open={open} onClose={onClose}>
                <Button type="primary" onClick={handePreview} >Preview</Button>
              </PreviewDrawer>
            </Flex>
          </>
        }
       
        

  </FormProvider>
  )
};

export default Template;