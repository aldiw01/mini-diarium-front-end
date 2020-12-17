import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonDropdown, Col, DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalBody, ModalFooter, ModalHeader, Label, Form, FormGroup, Input } from 'reactstrap';
import Spinner from 'react-spinkit';

const propTypes = {
    checkin: PropTypes.bool,
    data: PropTypes.object,
    handleCheckout: PropTypes.func,
    loader: PropTypes.bool,
    toggleCheckout: PropTypes.func
  };

class AddCheckout extends Component {
  constructor(props) {
    super(props)
  }

  render() {

    const { checkout, handleCheckout, loader, toggleCheckout } = this.props;

    return (
      <Modal isOpen={checkout} toggle={toggleCheckout} className={'modal-success modal-sm'}>
        <Form onSubmit={handleCheckout} method="post" encType="multipart/form-data" className="form-horizontal">
          <ModalHeader toggle={toggleCheckout}>Konfirmasi checkout</ModalHeader>
          <ModalBody className="mt-4 mx-4">
            <p>Apakah mau checkout?</p>
          </ModalBody>
          <ModalFooter>
            {loader ? <Spinner name='double-bounce' fadeIn="quarter" /> : ""}
            <Button color="success" type="submit" >Ya</Button>{' '}
            <Button color="secondary" onClick={toggleCheckout}>Tidak</Button>
          </ModalFooter>
        </Form>
      </Modal >
    );
  }
}

AddCheckout.propTypes = propTypes;

export default AddCheckout;