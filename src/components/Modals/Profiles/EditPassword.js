import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, InputGroup, InputGroupAddon, Modal, ModalBody, ModalFooter, ModalHeader, Form, FormGroup, Input } from 'reactstrap';
import Spinner from 'react-spinkit';

const propTypes = {
  edit_password: PropTypes.bool,
  data: PropTypes.object,
  handleChangePassword: PropTypes.func,
  handleCheckPassword: PropTypes.func,
  handleConfirmPassword: PropTypes.func,
  handleEditPassword: PropTypes.func,
  isGoodNewPass: PropTypes.bool,
  isGoodValPass: PropTypes.bool,
  loader: PropTypes.bool,
  toggleEditPassword: PropTypes.func
};

class EditPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOldPassClicked: false,
      isNewPassClicked: false,
      isValPassClicked: false,
      toggle: [false, false, false],
    }
  }

  toggle = (id) => {
    var toggle = this.state.toggle
    toggle[id] = !toggle[id]
    this.setState({
      toggle: toggle
    })
  }

  render() {

    const { edit_password, data, handleChangePassword, handleCheckPassword, handleConfirmPassword, handleEditPassword, isGoodNewPass, isGoodValPass, loader, toggleEditPassword } = this.props;

    return (
      <Modal isOpen={edit_password} toggle={toggleEditPassword} className={'modal-primary'}>
        <Form onSubmit={handleEditPassword} method="post" encType="multipart/form-data" className="form-horizontal">
          <ModalHeader toggle={toggleEditPassword}>Edit Password</ModalHeader>
          <ModalBody className="mt-4 mx-4">

            <FormGroup row>
              <Col md="4">
                Password Lama *
              </Col>
              <Col xs="12" md="8">
                <div className="controls">
                  <InputGroup>
                    <Input name="old" autoComplete="current-password" value={data.old} onChange={handleChangePassword} type={this.state.toggle[0] ? "text" : "password"} required />
                    <InputGroupAddon addonType="append">
                      <Button color="light" type="button" onClick={() => this.toggle(0)}>
                        <i className={this.state.toggle[0] ? "fa fa-eye" : "fa fa-eye-slash"}></i>
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                </div>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="4">
                Password Baru *
              </Col>
              <Col xs="12" md="8">
                <div className="controls">
                  <InputGroup>
                    <Input name="new" autoComplete="new-password" value={data.new} className={!this.state.isNewPassClicked ? "" : isGoodNewPass ? "is-valid" : "is-invalid"} onFocus={() => this.setState({ isNewPassClicked: true })} onChange={handleCheckPassword} type={this.state.toggle[1] ? "text" : "password"} required />
                    <InputGroupAddon addonType="append">
                      <Button color="light" type="button" onClick={() => this.toggle(1)}>
                        <i className={this.state.toggle[1] ? "fa fa-eye" : "fa fa-eye-slash"}></i>
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                </div>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="4">
                Validasi Password *
              </Col>
              <Col xs="12" md="8">
                <div className="controls">
                  <InputGroup>
                    <Input name="validate" autoComplete="new-password" value={data.validate} className={!this.state.isValPassClicked ? "" : isGoodValPass ? "is-valid" : "is-invalid"} onFocus={() => this.setState({ isValPassClicked: true })} onChange={handleConfirmPassword} type={this.state.toggle[2] ? "text" : "password"} required />
                    <InputGroupAddon addonType="append">
                      <Button color="light" type="button" onClick={() => this.toggle(2)}>
                        <i className={this.state.toggle[2] ? "fa fa-eye" : "fa fa-eye-slash"}></i>
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                </div>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col xs="6">
                <div className="w-100"></div>
                <strong className="text-danger">
                  * Required Element
                </strong>
              </Col>
            </FormGroup>

          </ModalBody>
          <ModalFooter>
            {loader ? <Spinner name='double-bounce' fadeIn="quarter" /> : ""}
            <Button color="primary" type="submit" disabled={!(isGoodNewPass && isGoodValPass)} >Save Changes</Button>{' '}
            <Button color="secondary" onClick={toggleEditPassword}>Cancel</Button>
          </ModalFooter>
        </Form>
      </Modal>
    );
  }
}

EditPassword.propTypes = propTypes;

export default EditPassword;