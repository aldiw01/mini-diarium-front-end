import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button,  Col, Modal, ModalBody, ModalFooter, ModalHeader, Label, Form, FormGroup, Input } from 'reactstrap';
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

        const { add, handleAdd, handleChangeNew, loader,  toggleAdd } = this.props;

        return (
      <Modal isOpen={add} toggle={toggleAdd} className={'modal-success modal-lg'}>
        <Form onSubmit={handleAdd} method="post" encType="multipart/form-data" className="form-horizontal">
          <ModalHeader toggle={toggleAdd}>Add Activity</ModalHeader>
          <ModalBody>
            <p>Tuliskan Apa yang kamu kerjakan hari ini</p>
            <FormGroup row>
              <Col md="2" className="m-auto">
                <Label htmlFor="hf-text">Aktivitas</Label>
              </Col>
              <Col xs="12" md="10">
                <Input type="text" onChange={handleChangeNew} name="listActivity" required />
              </Col>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            {loader ? <Spinner name='double-bounce' fadeIn="quarter" className="ml-auto" /> : ""}
            <Button color="success" disabled={loader}>Tambahkan</Button>{' '}
            <Button color="secondary" onClick={toggleAdd}>Batal</Button>
          </ModalFooter>
        </Form>
      </Modal >
        );
    }
}

AddActivities.propTypes = propTypes;

export default AddActivities;