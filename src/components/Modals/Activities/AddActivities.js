import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Form, FormGroup, Input } from 'reactstrap';
import Spinner from 'react-spinkit';

const propTypes = {
  add: PropTypes.bool,
  handleAdd: PropTypes.func,
  handleChangeNew: PropTypes.func,
  loader: PropTypes.bool,
  toggleAdd: PropTypes.func
};

class AddActivities extends Component {

  render() {

    const { add, handleAdd, handleChangeNew, loader, toggleAdd } = this.props;

    return (
      <Modal isOpen={add} toggle={toggleAdd} className={'modal-success'}>
        <Form onSubmit={handleAdd} method="post" encType="multipart/form-data" className="form-horizontal">
          <ModalHeader toggle={toggleAdd}>Add Activity</ModalHeader>
          <ModalBody>
            <p>Please tell your activity</p>
            <FormGroup row>
              <Col xs="12" md="12">
                <Input type="textarea" onChange={handleChangeNew} placeholder="Submit final task Telkom Athon" name="listActivity" required />
              </Col>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            {loader ? <Spinner name='double-bounce' fadeIn="quarter" className="ml-auto" /> : ""}
            <Button color="success" disabled={loader}>Add</Button>{' '}
            <Button color="secondary" onClick={toggleAdd}>Cancel</Button>
          </ModalFooter>
        </Form>
      </Modal >
    );
  }
}

AddActivities.propTypes = propTypes;

export default AddActivities;