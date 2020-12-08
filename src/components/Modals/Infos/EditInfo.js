import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Form, FormGroup, Input } from 'reactstrap';
import Spinner from 'react-spinkit';

const propTypes = {
  edit: PropTypes.bool,
  data: PropTypes.object,
  handleEdit: PropTypes.func,
  handleChange: PropTypes.func,
  loader: PropTypes.bool,
  toggleEdit: PropTypes.func
};

class EditInfo extends Component {

  render() {

    const { edit, data, handleEdit, handleChange, loader, toggleEdit } = this.props;

    return (
      <Modal isOpen={edit} toggle={toggleEdit} className={'modal-primary modal-lg'}>
        <Form onSubmit={handleEdit} method="post" encType="multipart/form-data" className="form-horizontal">
          <ModalHeader toggle={toggleEdit}>Edit Info</ModalHeader>

          <ModalBody className="mt-4 mx-4">
            <FormGroup row>
              <Col md="2">
                Title *
              </Col>
              <Col xs="12" md="10">
                <Input type="text" onChange={handleChange} name="name" value={data.name} required />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="2">
                Info *
              </Col>
              <Col xs="12" md="10">
                <Input type="textarea" rows="5" onChange={handleChange} name="value" value={data.value} required />
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
            <Button color="secondary" onClick={toggleEdit}>Cancel</Button>
          </ModalFooter>
        </Form>
      </Modal >
    );
  }
}

EditInfo.propTypes = propTypes;

export default EditInfo;