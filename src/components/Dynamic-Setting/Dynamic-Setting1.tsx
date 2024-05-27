import React, { useCallback, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Space, Typography, Flex } from 'antd';
import { FormProps } from 'antd/lib';
// import TextEditable from './components/TextEditable.tsx';
// import type { RadioChangeEvent } from 'antd';

// const initialState = [
//   { subKey: 1, field: 'abc' },
//   { subKey: 2, field: 'dc' }
// ];


const DynamicSetting: React.FC<FormProps> = ({ form }) => {
  const [isEditing, setIsEditing] = useState<string>('');
  const [fieldTitle, setFieldTitle] = useState({
    '0-1': 'Field1',
    '0-2': 'Field2'
  })

  // const [radios, setRadios] = useState([])
  // const [value, setValue] = useState('')


  const handleDoubleClick = (value: string) => {
    setIsEditing(value)
  };

  const handleChange = useCallback((event, number) => {
    setFieldTitle((prev) => ({...prev, 
        [number] : event.target.value
    }))
  }, [])

  // const setEditable = useCallback((data) => {
  //   setRadios(prevState => {
  //     const index = prevState.findIndex(item => item?.subKey === data.subKey)
  //     if (index !== -1) {
  //       return [
  //         ...prevState.slice(0, index),
  //         data,
  //         ...prevState.slice(index + 1)
  //       ];
  //     }
  //     return [...prevState, data];
  //   })

  // }, [])

  // const hdRadio = (e: RadioChangeEvent) => {
  //   console.log('radio checked', e.target.value);
  //   setValue(e.target.value)
  // };


  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      form={form}
      name="form3"
      style={{ maxWidth: '50%' }}
      autoComplete="off"
      initialValues={{ items: [{}] }}
    >
      <Flex gap="large">
        <div style={{ width: '50%'}}>
          <Form.List name="items">
              {(fields, { add, remove }) => (
              <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
                  {fields.map((field, index) => (
                  <Card
                      size="small"
                      title={`Item ${field.name + 1}`}
                      key={field.key}
                      extra={
                      <CloseOutlined
                          onClick={() => {
                          remove(field.name);
                          }}
                      />
                      }
                  >
{/* 
                 
                    <Form.List name={[field.name, 'Radio']}>

                      {(subFields, subOpt) => (
                        <>
                          {subFields.map((subField) => (
                            <>
                            <Space key={subField.key}>
                              {
                                radios.length >= 1 &&
                                radios.map((radio) => (
                                  <Form.Item noStyle name={[subField.name, radio.field_name]}>
                                    <Radio key={radio.field_id}>
                                      <TextEditable fieldName={radio.field_name}/>
                                    </Radio>
                                  </Form.Item>
                                ))
                              
                              }
                            </Space>
                              <Button type="dashed" onClick={() => subOpt.add()} block>
                              + Add Sub Item
                              </Button>
                             </>
                          ))}
                        </>
                      )}
                    </Form.List> */}

                      <Form.Item label={
                          <div onDoubleClick={() => handleDoubleClick(`${index}-1`)}>
                              {isEditing === `${index}-1` ? (
                                  <input
                                      type="text"
                                      value={fieldTitle[`${index}-1`]}
                                      onChange={(e) => handleChange(e, `${index}-1`)}
                                      // onBlur={handleBlur}
                                      // onKeyDown={handleKeyDown}
                                      autoFocus
                                  />
                                  ) : (
                                  <span>{fieldTitle[`${index}-1`] || 'Field 01'}</span>
                              )}
                          </div>
                      } name={[field.name, fieldTitle[`${index}-1`]]}>
                          <Input />
                      </Form.Item>

                      {/* Nest Form.List */}
                      <Form.Item label={
                          <div onDoubleClick={() => handleDoubleClick(`${index}-2`)}>
                              {isEditing === `${index}-2` ? (
                              <input
                                  type="text"
                                  value={fieldTitle[`${index}-2`]}
                                  onChange={(e) => handleChange(e, `${index}-2`)}
                                  // onBlur={handleBlur}
                                  // onKeyDown={handleKeyDown}
                                  autoFocus
                              />
                              ) : (
                                <span>{fieldTitle[`${index}-2`] || 'Field 02'}</span>
                              )}
                            </div>
                      } name={[field.name, fieldTitle[`${index}-2`]]}>
                      <Form.List name={[field.name, fieldTitle[`${index}-2`]]}>
                          {(subFields, subOpt) => (
                          <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
                              {subFields.map((subField) => (
                                <Space key={subField.key}>
                                    <Form.Item noStyle name={[subField.name, 'first']}>
                                    <Input placeholder="first" />
                                    </Form.Item>
                                    <Form.Item noStyle name={[subField.name, 'second']}>
                                    <Input placeholder="second" />
                                    </Form.Item>
                                    <CloseOutlined
                                    onClick={() => {
                                        subOpt.remove(subField.name);
                                    }}
                                    />
                                </Space>
                              ))}
                              <Button type="dashed" onClick={() => subOpt.add()} block>
                              + Add Sub Item
                              </Button>
                          </div>
                          )}
                      </Form.List>
                      {/* <Form.List name={[field.name, 'Radios']}>
                          {(subFields, subOpt) => (
                          <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16, marginTop: 20 }}>
                              {subFields.map((subField, index) => (
                                <Space key={subField.key}>
                                  <Form.Item noStyle 
                                    name={[field.name, radios.length >= 1 && radios[radios.length -1] ? radios[radios.length -1]['field'] : 'Field01']}>
                                  <Radio.Group onChange={hdRadio} value={value}>
                                      <Radio value={subField.key}><TextEditable value={radios} subKey={subField.key} setEditable={setEditable}/></Radio>
                                  </Radio.Group>
                                  </Form.Item>
                                </Space>
                              ))}
                              <Button type="dashed" onClick={() => subOpt.add()} block>
                              + Add Radio
                              </Button>
                          </div>
                          )}
                      </Form.List> */}

                      </Form.Item>
                  </Card>
                  ))}

                  <Button type="dashed" onClick={() => add()} block>
                  + Add Item
                  </Button>
              </div>
              )}
          </Form.List>
        </div>
        <div style={{ width: '50%'}}>
          <Form.Item noStyle shouldUpdate>
            {() => (
              <Typography>
                <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
              </Typography>
            )}
          </Form.Item>
        </div>
      </Flex>
    </Form>
  );
};

export default DynamicSetting;