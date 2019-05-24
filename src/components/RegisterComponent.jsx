import React from 'react';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import axios from 'axios';
import './signin.scss';

const fontStyle = { fontSize: '30px', color: '#1890ff', paddingLeft: '10px' };
const FormItem = Form.Item;

class SignInComponent extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios.post('/subscribe/register', { ...values })
          .then(res => {
            const { data } = res;
            if (data.success) {
              message.success('注册成功！');
              this.props.history.push('/login');
            }
          })
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <div className="sign-in-box">
          <div className="logo">
            <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="logo"/>
            <span style={fontStyle}>ANT-DEMO</span>
          </div>
          <div className="input-box">
            <Form onSubmit={this.handleSubmit} className="login-form">
              <FormItem>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                )}
              </FormItem>
              <FormItem>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Register
                </Button>
              </FormItem>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}

export default Form.create()(SignInComponent);