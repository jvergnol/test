
import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import ServicesLogin from './ServicesLogin'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
class Login extends Component {
    constructor(){
        super();
        this.state = {
        email: '',
        password: '',
        redirectToReferrer: false
        };
        this.login = this.login.bind(this);
        this.onChange = this.onChange.bind(this);
        this.MySwal = withReactContent(Swal)
        }

        login(){
                ServicesLogin.login(this.state.email , this.state.password)
                  .then(response => {

                    this.setState({redirectToReferrer: true});
                  })
                  .catch(error => {
                      this.MySwal.fire({
                                    text:  error.data,
                                    type:  'warning',
                                    showCancelButton: false})
                  })

        }
    onChange(e){
        this.setState({[e.target.name]:e.target.value});
    }
  render() {
      if (this.state.redirectToReferrer || localStorage.getItem('userData')){
        return (<Redirect to={'/dashboard'}/>)
        }
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Email" name="email" autoComplete="email" onChange={this.onChange} />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" name= "password" autoComplete="current-password" onChange={this.onChange} />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" onClick={this.login}>Login</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
