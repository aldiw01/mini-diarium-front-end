import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Alert, Button, Card, CardBody, CardFooter, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import AuthService from '../../../server/AuthService';
import Spinner from 'react-spinkit';

import bgImage from "assets/img/landing-bg.jpg";
import logo from "assets/img/logo.png";
import mascot from "assets/img/mascot.png";

class Login extends Component {
  constructor() {
    super();
    this.Auth = new AuthService();
    this.state = {
      nik: '',
      password: '',
      isAlertVisible: false,
      isLoggedin: false,
      message: '',
      loader: false,
      toggle: false
    }
  }

  componentDidMount() {
    if (this.Auth.loggedIn()) {
      this.setState({
        isLoggedin: true
      })
    }
  }

  onDismiss = () => {
    this.setState({ isAlertVisible: false });
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleFormSubmit = (event) => {
    this.setState({ loader: true });
    event.preventDefault();
    this.Auth.login(this.state.nik, this.state.password)
      .then(res => {
        if (res.data.success) {
          this.setState({ loader: false });
          this.props.history.push("/dashboard");
        } else {
          this.setState({ loader: false });
          alert(res.data.err);
        }
      })
      .catch(err => {
        console.log(err);
        alert(err);
      })
  }

  toggle = (id) => {
    this.setState({
      toggle: !this.state.toggle
    })
  }

  render() {
    return (
      this.state.isLoggedin ? <Redirect to="/dashboard" /> :
        <React.Fragment>
          <div style={{ backgroundImage: "url('" + bgImage + "')", backgroundSize: "cover" }}>
            <div className="app flex-row align-items-center">
              <Container>
                <Row className="w-75 m-auto">
                  <Col xs="12">
                    <Alert color="info" isOpen={this.state.isAlertVisible} toggle={this.onDismiss}>
                      {this.state.message}
                    </Alert>
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Col md="8">
                    <CardGroup>
                      <Card className="p-4">
                        <CardBody>
                          <Form method="post" onSubmit={this.handleFormSubmit}>
                            <h2 style={{ textAlign: 'left', verticalAlign: 'bottom' }}><img src={mascot} alt="Mini-Diarium" style={{ height: "30px", verticalAlign: 'top' }} /> Login</h2>
                            <p className="text-muted">Sign In to your account</p>

                            <InputGroup className="mb-3">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="icon-user"></i>
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input type="text" placeholder="NIK" autoComplete="username" name="nik" onChange={this.handleChange} required />
                            </InputGroup>

                            <InputGroup className="mb-4">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="icon-lock"></i>
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input type={this.state.toggle ? "text" : "password"} placeholder="Password" autoComplete="current-password" name="password" onChange={this.handleChange} required />
                              <InputGroupAddon addonType="append">
                                <Button color="light" type="button" onClick={this.toggle}>
                                  <i className={this.state.toggle ? "fa fa-eye" : "fa fa-eye-slash"}></i>
                                </Button>
                              </InputGroupAddon>
                            </InputGroup>

                            <Row>
                              <Col xs="6" className="d-flex">
                                <Button color="danger" className="px-4" disabled={this.state.loader}>Login</Button>
                                {this.state.loader ? <Spinner name='double-bounce' fadeIn="quarter" className="m-auto" /> : ""}
                              </Col>
                            </Row>
                          </Form>
                        </CardBody>
                      </Card>
                      <Card className="text-white bg-dark py-5 d-md-down-none" style={{ width: '44%' }}>
                        <CardBody className="text-center">
                          <div>
                            <h2>Sign up</h2>
                            <p>Register first if you don't have accont yet.</p>
                            <Link to="/register">
                              <Button color="danger" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                            </Link>
                          </div>
                        </CardBody>
                      </Card>
                    </CardGroup>
                    <Card>
                      <CardFooter>
                        <img src={logo} alt="Mini-Diarium" style={{ height: "30px", position: "absolute", top: "8px" }} />
                        <span className="float-right"><a href={"mailto:" + process.env.REACT_APP_EMAIL} target="_blank" rel="noopener noreferrer" className="text-danger">{process.env.REACT_APP_NAME}</a> &copy; {new Date().getFullYear()} {process.env.REACT_APP_ORGANIZATION}</span>
                      </CardFooter>
                    </Card>

                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </React.Fragment>
    );
  }
}

export default Login;
