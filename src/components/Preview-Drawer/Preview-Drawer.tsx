import React, { Fragment, useEffect, useState } from 'react';
import { Select, Divider, Drawer, Flex } from 'antd';
import type { SelectProps } from 'antd';

import ReactQuill from 'react-quill'

import AttachFile from '../AttachFile/Attach-File.tsx';
import { FormData } from '../Template/Template.tsx';
import ImagePreview from '../Image-Preview/Image-Preview.tsx';

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

  const selectProps: SelectProps = {
    value,
    onChange: setValue,
  };
  return (
    <>
      { children }
      <Drawer width={640} placement="right" closable={false} onClose={onClose} open={open}>
          <div className='space-y-4'>
            <p><span> From: </span> {fromEmail} </p>
            <p><span> To: </span> {toEmail}</p>
            <p>{fromDateTime}</p>
            <p>Subject: { subject }</p>
            <Flex gap="small" align="center">Cc: <Select disabled {...sharedProps} {...selectProps} /></Flex>
          </div>
          <div className='space-y-4 mt-4 mb-2'>
            <ReactQuill
              value={content}
              readOnly={true}
              theme={"bubble"}
            />
          
            <Divider />
            <p>Content In Dynamic Setting</p>
            {
              dynamic.length > 0 && dynamic.map((item, index) => (
                <Flex gap="small">
                  <div key={index}>{Object.keys(item)} : </div>
                  <div key={index}>{Object.values(item)}</div>
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
          
      </Drawer>
    </>
  );
};

export default PreviewDrawer;