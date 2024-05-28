import React, { useCallback, useState } from 'react';

import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography } from 'antd';
import { FormInstance } from 'antd/lib/form';

export interface FormProps {
  form: FormInstance<any>;
}

interface FieldType {
  field_id: number,
  field_name: string
}

const DynamicSetting: React.FC<FormProps> = ({ form }) => {
  const [isEditing, setIsEditing] = useState<number>(0);
  const [fieldDynamic, setFieldDynamic] = useState<FieldType[]>([{
    field_id: 1,
    field_name: 'Field_01'
  }])

  const handleDoubleClick = (index) => {
    setIsEditing(index)
  }

  const handleChange = useCallback((e, id) => {
    const { value } = e.target;
    let data = { field_id: id, field_name: value}
     setFieldDynamic(prevState => {
        const index = prevState.findIndex(item => item?.field_id === id)
        if (index !== -1) {
          return [
            ...prevState.slice(0, index),
            data,
            ...prevState.slice(index + 1)
          ];
        }
        return [...prevState, data];
     })
  }, [])

  return (
    <Form
      labelCol={{ flex: '110px' }}
      labelAlign="left"
      labelWrap
      wrapperCol={{ flex: 1 }}
      colon={false}
      form={form}
      style={{ background: '#f9f9f9', padding: 50 }}
      initialValues={{ items: [{}] }}
    >
      <Form.List
        name="dynamic"
      >
        {(fields, { add }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item label={
                <div className='w-52' onDoubleClick={() => handleDoubleClick(index)}>
                  {isEditing === index ? (
                      <input
                          type="text"
                          name="field_name"
                          value={fieldDynamic[index]?.field_name}
                          onChange={(event) => handleChange(event, index + 1)}
                          autoFocus
                      />
                      ) : (
                      <span>{fieldDynamic[index]?.field_name || 'Field_01'}</span>
                  )}
                </div>
            } name={[field.name, fieldDynamic[index]?.field_name]}>
                <Input />
              </Form.Item>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{ width: '50%' }}
                icon={<PlusOutlined />}
              >
                Add field
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
      <div className="mt-32">
          <Form.Item noStyle shouldUpdate>
              {() => (
              <Typography>
                  <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
              </Typography>
              )}
          </Form.Item>
      </div>
    </Form>
  );
};

export default DynamicSetting;