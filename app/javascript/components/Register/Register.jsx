import React, { Component } from 'react'
import Logo from 'images/logo_transparent.png'
import './Register.css'
import { Container } from 'reactstrap';
import {
  Form,
  Input,
  Button,
} from 'antd';


class Register extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        console.log(values.email)
        fetch('/api/create-user', {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password
          })
        }).then(result => {
          console.log(result)
        })
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };


  render() {

    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      // wrapperCol: {
      //   xs: { span: 24 },
      //   sm: { span: 16 },
      // },
    };

    return (
      <Container className="themed-container text-center" fluid="xl">
        <div>
          <img src={Logo} className="logo"></img>
        </div>
        <div className="text-center register-form">

          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label="E-mail">
              {getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Password" hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ],
              })(<Input.Password />)}
            </Form.Item>
            <Form.Item >
              <Button type="primary" htmlType="submit" className="register-form-button">
                Register
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Container>

    )
  }
}

export default Form.create()(Register)
