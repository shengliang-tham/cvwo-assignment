import React, { Component } from 'react'
import './Login.css'
import { Form, Icon, Input, Button, notification, Spin, } from 'antd';
import { Container } from 'reactstrap';
import Logo from 'images/logo_transparent.png'
import { Link, withRouter } from 'react-router-dom'

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class Login extends Component {

  state = {
    spinner: false,
    error: false,
    errorMessage: '',

  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {

      if (!err) {

        this.setState({ spinner: true })
        fetch('/api/login', {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          })

        }).then(response => response.json())

          .then(data => {
            this.setState({ spinner: false })
            if (data.error) {
              notification.error({
                message: "Error",
                description: data.error,
                placement: "bottomRight",
              });
            } else {
              notification.success({
                message: "Successfully registered",
                description: "Logging in..",
                placement: "bottomRight",
              });
              this.props.history.push('/home');
            }
          })
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
              {getFieldDecorator('email', {
                rules: [
                  {
                    required: true, message: 'Please input your email!'
                  }, {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Email"
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
              <Spin indicator={antIcon} spinning={this.state.spinner}>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Log in
              </Button>
              </Spin>
              <Link to="/register"> Register now! </Link>
            </Form.Item>
          </Form>
        </div>
      </Container>
    );
  }
}

export default withRouter(Form.create({ name: "normal_login" })(Login))