import React, { Component } from 'react'
import './Login.css'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Container } from 'reactstrap';
import Logo from 'images/logo_transparent.png'
import { Link } from 'react-router-dom'

class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Container className="themed-container text-center" fluid="xl">
        <div>
          <img src={Logo} className="logo"></img>
        </div>
        <div className="text-center">
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {/* {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>Remember me</Checkbox>)}
              <a className="login-form-forgot" href="">
                Forgot password
          </a> */}
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              <Link to="/register"> Register now! </Link>
            </Form.Item>
          </Form>
        </div>
      </Container>
    );
  }
}

export default Form.create({ name: "normal_login" })(Login)