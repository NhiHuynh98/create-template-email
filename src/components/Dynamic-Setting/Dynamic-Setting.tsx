import React from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography } from 'antd';
import { FormInstance } from 'antd/lib/form';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

export interface FormProps {
  form: FormInstance<any>;
}


const DynamicSetting: React.FC<FormProps> = ({ form }) => {
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
        name="cc"
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                // {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                {...formItemLayout}
                // label={index === 0 ? 'Passengers' : ''}
                required={false}
                key={field.key}
              >
                <Form.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  noStyle
                >
                  <Input style={{ width: '60%' }} />
                </Form.Item>
                {fields.length > 1 ? (
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                  />
                ) : null}
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
              {/* <Button
                type="dashed"
                onClick={() => {
                  add('The head item', 0);
                }}
                style={{ width: '60%', marginTop: '20px' }}
                icon={<PlusOutlined />}
              >
                Add field at head
              </Button> */}
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