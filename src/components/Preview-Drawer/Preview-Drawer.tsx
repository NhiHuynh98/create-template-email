import React, { Fragment, useState } from 'react';
import { Select, Divider, Drawer, Flex, Button } from 'antd';
import type { SelectProps } from 'antd';

import ReactQuill from 'react-quill'

import AttachFile from '../AttachFile/Attach-File.tsx';
import { FormData } from '../Template/Template.tsx';
import ImagePreview from '../Image-Preview/Image-Preview.tsx';
import List from '../Theme/List/List.tsx';

interface ItemProps {
    label: string;
    value: string;
}

const options: ItemProps[] = [];

const sharedProps: SelectProps = {
    mode: 'multiple',
    style: { width: '100%' },
    options,
    placeholder: 'Select Item...',
    maxTagCount: 'responsive',
};


interface PreviewDwawerProps {
  children: React.ReactNode,
  data: FormData,
  open: boolean,
  onClose: () => void;
}

const PreviewDrawer: React.FC<PreviewDwawerProps> = ({ children, data, open, onClose }) => {
  const { subject, content, fromName, fromDateTime, fromEmail, toEmail, upload_images = [], dynamic = [], cc } = data
  const [value, setValue] = useState<string[]>(['abc@gmail.com', 'cde@gmail.com', 'sasd@gmail.com']);
  const [theme, setTheme] = useState({
    "id": "T_001",
    "name": "Light",
    "colors": {
      "body": "#FFFFFF",
      "text": "#000000",
      "button": {
        "text": "white",
        "background": "blue"
      },
      "link": {
        "text": "teal",
        "opacity": 1
      }
    },
    "font": "Tinos"
  })
  const [childrenDrawer, setChildrenDrawer] = useState(false);

  const showChildrenDrawer = () => {
    setChildrenDrawer(true);
  };

  const onChildrenDrawerClose = () => {
    setChildrenDrawer(false);
  };


  const selectProps: SelectProps = {
    value,
    onChange: setValue,
  };

  console.log(theme)
  return (
    <>
      { children }
      <Drawer className='fkskfj' style={{ backgroundColor: theme?.colors?.body, fontFamily: theme.font}} width={640} placement="right" closable={false} onClose={onClose} open={open}>
          <div className='space-y-4'>
            <p><span style={{ color: theme.colors.text }}> From: </span> {fromEmail} </p>
            <p><span style={{ color: theme.colors.text }}> To: </span> {toEmail}</p>
            <p>{fromDateTime}</p>
            <p><span style={{ color: theme.colors.text }}>Subject:</span>{ subject }</p>
            <Flex gap="small" align="center"><span style={{ color: theme.colors.text }}>Cc:</span> <Select disabled {...sharedProps} {...selectProps} /></Flex>
          </div>
          <div className='space-y-4 mt-4 mb-2'>
            <ReactQuill
              value={content}
              readOnly={true}
              theme={"bubble"}
            />
          
            <Divider />
            <p style={{ color: theme.colors.text }}>Content In Dynamic Setting</p>
            {
              dynamic.length > 0 && dynamic.map((item, index) => (
                <Flex gap="small">
                  {
                    item &&
                    <>
                      <div key={index}>{Object.keys(item)} : </div>
                      <div key={index}>{Object.values(item)}</div>
                    </>
                  }
                 
                </Flex>
              ))
            }
            <p>Best Regards</p>
            <p>FROM: { fromName }</p>
          </div>
          <Divider />

          <AttachFile />

          {
            upload_images.length >0 && upload_images.map((img, index) => (
              <Fragment key={index}>
                 <ImagePreview img={img} />
              </Fragment>
            ))
          }

        <div className='mt-3'>
          <Button onClick={showChildrenDrawer} style={{ background: theme.colors.button.background }}>
            <span style={{ color: theme.colors.button.text }}>Choose Theme</span>
          </Button>
          <Drawer
            title="Choose Theme"
            width={320}
            closable={false}
            onClose={onChildrenDrawerClose}
            open={childrenDrawer}
          >
            <List hdSetTheme={(val) => {
              setTheme(val)
              onChildrenDrawerClose()
            }}/>
          </Drawer>
        </div>
          
      </Drawer>
    </>
  );
};

export default PreviewDrawer;