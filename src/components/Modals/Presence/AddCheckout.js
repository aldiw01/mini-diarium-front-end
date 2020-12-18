import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Form } from 'reactstrap';
import Spinner from 'react-spinkit';

const propTypes = {
  checkin: PropTypes.bool,
  data: PropTypes.object,
  handleCheckout: PropTypes.func,
  loader: PropTypes.bool,
  toggleCheckout: PropTypes.func
};

class AddCheckout extends Component {

  render() {

    const { checkout, handleCheckout, loader, toggleCheckout } = this.props;

    return (
      <Modal isOpen={checkout} toggle={toggleCheckout} className={'modal-danger modal-sm'}>
        <Form onSubmit={handleCheckout} method="post" encType="multipart/form-data" className="form-horizontal">
          <ModalHeader toggle={toggleCheckout}>Konfirmasi checkout</ModalHeader>
          <ModalBody>
            Apakah mau checkout?
          </ModalBody>
          <ModalFooter>
            {loader ? <Spinner name='double-bounce' fadeIn="quarter" /> : ""}
            <Button color="danger" type="submit" >Ya</Button>{' '}
            <Button color="secondary" onClick={toggleCheckout}>Tidak</Button>
          </ModalFooter>
        </Form>
      </Modal >
    );
  }
}

AddCheckout.propTypes = propTypes;

export default AddCheckout;