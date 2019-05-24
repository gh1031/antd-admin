import React from 'react';
import { Modal, Form, Input, Radio, Cascader, message } from 'antd';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const formItems = [
  {
    label: 'Name',
    field: 'name',
    message: 'Please enter a legitimate Chinese characters',
    pattern: /[\u4e00-\u9fa5]{2,6}/,
    type: 'input',
  },
  {
    label: 'NickName',
    field: 'nickName',
    message: 'Please enter a legitimate nickName',
    pattern: /[a-zA-Z]+/,
    type: 'input',
  },
  {
    label: 'Gender',
    field: 'gender',
    message: 'Please select gender',
    pattern: /(\bfemale\b)|(\bmale\b)/,
    type: 'radio',
  },
  {
    label: 'Age',
    field: 'age',
    message: 'Please enter 18 to 90 years of age',
    pattern: /^(1[8-9]|[2-8][0-9]{1,2}|90)$/,
    type: 'input',
  },
  {
    label: 'Phone',
    field: 'phone',
    message: 'Please enter 11 mobile phone numbers',
    pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
    type: 'input'
  },
  {
    label: 'E-mail',
    field: 'email',
    message: 'Please enter a legitimate email',
    pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
    type: 'input'
  },
  {
    label: 'Address',
    field: 'address',
    message: 'Please select your address',
    type: 'cascader'
  }
];

const CreateUsersForm = Form.create()(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form, options } = this.props;
      const { getFieldDecorator } = form;
      return (
        <div>
          <Modal
            title="添加新用户"
            okText="保存"
            onOk={onCreate}
            cancelText="取消"
            onCancel={onCancel}
            visible={visible}
          >
            <Form>
              {
                formItems.map(i => {
                  if (i.type === 'input') {
                    return (
                      <FormItem
                        label={i.label}
                        key={i.label}
                        labelCol={{ span: 4, offset: 2 }}
                        wrapperCol={{ span: 14, offset: 1 }}
                      >
                        {
                          getFieldDecorator(i.field, {
                            rules: [{
                              required: true,
                              message: i.message,
                              pattern: i.pattern
                            }]
                          })(<Input placeholder={i.message} />)
                        }
                      </FormItem>
                    )
                  } else if (i.type === 'radio') {
                    return (
                      <FormItem
                        label={i.label}
                        key={i.label}
                        labelCol={{ span: 4, offset: 2 }}
                        wrapperCol={{ span: 14, offset: 1 }}
                      >
                        {
                          getFieldDecorator(i.field, {
                            rules: [{
                              required: true,
                              message: i.message
                            }]
                          })(
                            <RadioGroup>
                              <Radio value="male">Male</Radio>
                              <Radio value="female">Female</Radio>
                            </RadioGroup>
                          )
                        }
                      </FormItem>
                    )
                  } else {
                    return (
                      <FormItem
                        label={i.label}
                        key={i.label}
                        labelCol={{ span: 4, offset: 2 }}
                        wrapperCol={{ span: 14, offset: 1 }}
                      >
                        {
                          getFieldDecorator(i.field, {
                            rules: [{
                              required: true,
                              message: i.message
                            }]
                          })(
                            <Cascader options={options} />
                          )
                        }
                      </FormItem>
                    )
                  }
                })
              }
            </Form>
          </Modal>
        </div>
      )
    }
  }
)

class CreateUsersModal extends React.Component {
  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) return;
      values.address.join(' ');
      axios.post('/users/createUsers', {...values})
        .then(res => {
          console.log(res);
          const { data } = res;
          if (data.success) {
            message.success('保存成功！');
            this.props.handleCancel();
          }
        })
        .catch((err) => {
            message.error(err);
        })
    })
  }
  saveRef = (formRef) => {
    this.formRef = formRef;
  }
  render () {
    const { visible, handleCancel, options } = this.props;
    console.log(options);
    return (
      <CreateUsersForm 
        wrappedComponentRef={this.saveRef}
        visible={visible}
        onCancel={handleCancel}
        onCreate={this.handleCreate}
        options={options}
      />
    )
  }
}

export default connect(
  ({ user }) => {
    const { options } = user;
    return { options };
  }
)(CreateUsersModal);