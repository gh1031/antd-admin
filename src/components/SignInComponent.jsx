import React from 'react';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import './signin.scss';
import { Z_BUF_ERROR } from 'zlib';

const fontStyle = { fontSize: '30px', color: '#1890ff', paddingLeft: '10px' };
const FormItem = Form.Item;

class SignInComponent extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios.post('/subscribe/login', { ...values })
          .then(res => {
            const { data } = res;
            if (data.success) {
              message.success('登录成功...')
              this.props.dispatch({
                type: 'LOG_IN',
                payload: data.username
              })
              window.sessionStorage.setItem('username', data.username);
              this.props.history.push('/dashboard');
            } else {
              message.error(data.errorMsg);
            }
          })
          .catch(err => {
            message.error(err)
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
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(
                  <Checkbox>Remember me</Checkbox>
                )}
                <a className="login-form-forgot" href="">Forgot password</a>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Log in
                </Button>
                Or <NavLink to="/register">register now!</NavLink>
              </FormItem>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(Form.create()(SignInComponent));