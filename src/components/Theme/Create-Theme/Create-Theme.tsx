import React, { useState } from 'react';

import { Button, Modal, ColorPicker, Form, Input,Select  } from 'antd';
import type { FormProps } from 'antd';

import { getAvailableFonts } from "@remotion/google-fonts";

type FieldType = {
    themeName: string;
    bgColor: string;
    textColor: string;
    buttonText: string;
    buttonColor: string;
    fontFamily: string;
  };

type FieldData = {
    name: string;
    colors: {
        body: string;
        text: string;
        button: {
            text: string;
            background: string;
        };
    };
    font: string;
}

interface LocalizedModalProps {
  cb: (val: FieldData) => void;
}

const CreateTheme: React.FC<LocalizedModalProps> = ({ cb }) => {
  const newFonts = getAvailableFonts();
  const [open, setOpen] = useState(false);
  const [fontFamily, setFontFamily] = useState<string>('')

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const onChangeFontFamily = (value: string) => {
    setFontFamily(value);
  };

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
    cb({
      name: values.themeName,
      colors: {
        body: values.bgColor,
        text: values.textColor,
        button: {
          text: values.buttonText,
          background: values.buttonColor
        }
      },
      font: values.fontFamily
    })
    hideModal()
  };
  
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Create Theme
      </Button>
      <Modal
        title="Create Theme"
        open={open}
        onOk={hideModal}
        onCancel={hideModal}
        footer={[]}
      >
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Theme Name"
                    name="themeName"
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Text Color"
                    name="textColor"
                    getValueFromEvent={(value) => value ? value.toHexString() : undefined }
                >
                    <ColorPicker defaultValue="#1677ff" />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Background Color"
                    name="bgColor"
                    getValueFromEvent={(value) => value ? value.toHexString() : undefined }
                >
                    <ColorPicker defaultValue="#1677ff" />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Button text"
                    name="buttonText"
                    getValueFromEvent={(value) => value ? value.toHexString() : undefined }
                >
                    <ColorPicker defaultValue="#1677ff" />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Button Color"
                    name="buttonColor"
                    getValueFromEvent={(value) => value ? value.toHexString() : undefined }
                >
                    <ColorPicker defaultValue="#1677ff" />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Font Family"
                    name="fontFamily"
                    getValueFromEvent={(value) => value }
                >
                    <Select
                        style={{ width: 120 }}
                        value={fontFamily}
                        onChange={onChangeFontFamily}
                        options={newFonts.map((city) => ({ label: city.fontFamily, value: city.fontFamily }))}
                    />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 20, span: 32 }}>
                    <Button type="primary" htmlType="submit">
                        OK
                    </Button>
                </Form.Item>
            </Form>
      </Modal>
    </>
  );
};

// const CreateTheme: React.FC = () => {
//   const [modal, contextHolder] = Modal.useModal();

//   const confirm = () => {
//     modal.confirm({
//       title: 'Confirm',
//       icon: <ExclamationCircleOutlined />,
//       content: 'Bla bla ...',
//       okText: 'OK',
//       cancelText: 'Cancel',
//     });
//   };

//   return (
//     <>
//       <Space>
//         <LocalizedModal cb={cb} />
//       </Space>
//       {contextHolder}
//     </>
//   );
// };

export default CreateTheme;