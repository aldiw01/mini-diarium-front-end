import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Form, FormGroup, Input } from 'reactstrap';
import Spinner from 'react-spinkit';

const propTypes = {
  edit_profile: PropTypes.bool,
  data: PropTypes.object,
  handleChange: PropTypes.func,
  handleEditProfile: PropTypes.func,
  loader: PropTypes.bool,
  toggleEditProfile: PropTypes.func
};

class EditProfile extends Component {

  render() {

    const { edit_profile, data, handleChange, handleEditProfile, loader, toggleEditProfile } = this.props;

    return (
      <Modal isOpen={edit_profile} toggle={toggleEditProfile} className={'modal-primary'}>
        <Form onSubmit={handleEditProfile} method="post" encType="multipart/form-data" className="form-horizontal">
          <ModalHeader toggle={toggleEditProfile}>Edit Profile</ModalHeader>
          <ModalBody className="mt-4 mx-4">

            <FormGroup row>
              <Col md="3">
                Nama *
              </Col>
              <Col xs="12" md="9">
                <Input type="text" onChange={handleChange} name="Name" value={data.Name} required />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                Email *
              </Col>
              <Col xs="12" md="9">
                <Input type="email" onChange={handleChange} name="Email" value={data.Email} required />
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
            <Button color="primary" type="submit" >Save Changes</Button>{' '}
            <Button color="secondary" onClick={toggleEditProfile}>Cancel</Button>
          </ModalFooter>
        </Form>
      </Modal>
    );
  }
}

EditProfile.propTypes = propTypes;

export default EditProfile;