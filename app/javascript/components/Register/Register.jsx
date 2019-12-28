import React, { Component } from 'react'
import Logo from 'images/logo_transparent.png'
import './Register.css'
import { Container } from 'reactstrap';
import {
  Form,
  Input,
  Button,
  Spin,
  Icon,
  notification
} from 'antd';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

// const errorNotification = () => {
//   notification.error({
//     message: "Error",
//     description: this.state.errorMesage,
//     placement: "bottomRight",
//   });

//   this.setState({ error: false, errorMessage: '' })
// };


class Register extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    spinner: false,
    error: false,
    errorMessage: ''
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({ spinner: true })
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
            password: values.password,
          })
        }).then(response => response.json())
          .then(data => {
            console.log(data)
            if (data.error) {
              notification.error({
                message: "Error",
                description: data.error[0],
                placement: "bottomRight",
              });
            } else {
              notification.success({
                message: "Successfully registered",
                description: "Logging in..",
                placement: "bottomRight",
              });
            }
            this.setState({ spinner: false })
          })
          .catch(error => {
            if (error) {
              this.setState({ spinner: false })
              notification.error({
                message: "Error",
                description: error,
                placement: "bottomRight",
              });
            }
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
              <Spin indicator={antIcon} spinning={this.state.spinner}>
                <Button type="primary" htmlType="submit" className="register-form-button">
                  Register
              </Button>
              </Spin>
            </Form.Item>
          </Form>
        </div>
      </Container>

    )
  }
}

export default Form.create()(Register)
